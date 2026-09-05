import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
const isProduction = process.env.NODE_ENV === 'production' || !process.env.NGINX_PORT;
const PORT = isProduction ? (Number(process.env.PORT) || 8080) : 3000;

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'AKASA Backend' });
});

// Initialize Gemini client lazily/safely
let genAIClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// System prompt as specified in the prompt instructions
const AKASA_SYSTEM_PROMPT = `Kamu adalah AKASA, seorang teman dan kakak mentor psikologi yang sangat empati untuk siswa SMA. Bicaralah dengan gaya bahasa Indonesia yang hangat, suportif, dan menenangkan (gunakan kata 'kamu'). Hindari bahasa medis yang kaku. Pertama, validasi perasaan siswa dengan 2-3 kalimat yang hangat. Kedua, berikan 3 saran tindakan yang sangat sederhana, praktis, dan langsung bisa dilakukan saat itu juga tanpa membuat mereka tambah stres.`;

// API endpoint for AKASA AI screening
app.post('/api/screening', async (req: Request, res: Response) => {
  try {
    const { emotion, story } = req.body;

    if (!story || typeof story !== 'string') {
      return res.status(400).json({ error: 'Cerita tidak boleh kosong' });
    }

    const ai = getGeminiClient();

    if (ai) {
      try {
        const prompt = `Emosi dominan siswa: ${emotion || 'Stres Akademik'}\nCerita siswa SMA: "${story}"\n\nJawablah dengan bahasa Indonesia yang hangat dan empati sesuai instruksi sistem. Berikan format JSON dengan field:\n- notesForYou (string, 2-3 kalimat validasi empati hangat)\n- smallSteps (array berisi tepat 3 string saran praktis yang sangat sederhana dan tidak memberatkan)`;

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 5000)
        );

        const geminiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: AKASA_SYSTEM_PROMPT,
            temperature: 0.7,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                notesForYou: {
                  type: Type.STRING,
                  description: 'Kalimat validasi emosi yang hangat dan penuh empati untuk siswa SMA',
                },
                smallSteps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.STRING,
                  },
                  description: '3 saran tindakan praktis yang sangat sederhana dan langsung bisa dilakukan',
                },
              },
              required: ['notesForYou', 'smallSteps'],
            },
          },
        });

        const response: any = await Promise.race([geminiPromise, timeoutPromise]);
        const rawText = response.text || '';
        const parsed = JSON.parse(rawText);

        return res.json({
          notesForYou: parsed.notesForYou || 'Terima kasih sudah berbagi ceritamu. Setiap perasaan lelah dan cemas yang kamu rasakan adalah hal yang sangat manusiawi dan valid.',
          smallSteps: Array.isArray(parsed.smallSteps) && parsed.smallSteps.length >= 3
            ? parsed.smallSteps.slice(0, 3)
            : [
                'Tutup buku dan laptop selama 10 menit, luangkan waktu untuk bernapas tenang.',
                'Pilih satu tugas paling kecil dan selesaikan sedikit demi sedikit tanpa terburu-buru.',
                'Minum segelas air putih hangat dan regangkan otot leher serta bahu yang tegang.'
              ],
        });
      } catch (geminiError) {
        console.warn('Gemini API call returned or timed out, activating contextual psychoeducational responder');
      }
    }

    // High quality empathetic contextual response for students
    const lowerStory = story.toLowerCase();
    const isExam = lowerStory.includes('ujian') || lowerStory.includes('ulangan') || lowerStory.includes('test') || lowerStory.includes('uts') || lowerStory.includes('uas');
    const isDeadline = lowerStory.includes('deadline') || lowerStory.includes('tugas') || lowerStory.includes('pr') || lowerStory.includes('banyak') || lowerStory.includes('numpuk');
    const isSleep = lowerStory.includes('tidur') || lowerStory.includes('begadang') || lowerStory.includes('ngantuk') || lowerStory.includes('mata');

    const emotionMap: Record<string, { label: string; baseValidation: string; tips: string[] }> = {
      burnout: {
        label: 'Burnout',
        baseValidation: 'Terima kasih sudah berani mengungkapkan apa yang kamu rasakan. Mengalami burnout di tengah padatnya ritme SMA membuktikan bahwa kamu sudah berjuang sekuat tenaga hingga bateraimu habis. Izinkan dirimu untuk rehat sejenak hari ini, karena kamu manusia dan bukan mesin.',
        tips: [
          'Ambil jeda tanpa rasa bersalah: Berhenti total belajar selama 20 menit sekarang juga, tubuhmu berhak pulih.',
          'Ubah lingkungan sejenak: Pindahlah dari meja belajar ke ruang terbuka atau dekat jendela yang ada angin sejuk.',
          'Beri apresiasi pada diri: Ucapkan terima kasih pada tubuh dan pikiranmu yang sudah bertahan sejauh ini.'
        ]
      },
      anxious: {
        label: 'Anxious (Kecemasan)',
        baseValidation: 'Wajar sekali jika dadamu terasa berdebar atau pikiranmu berputar membayangkan hal buruk. Rasa cemas ini muncul karena kamu sangat peduli dengan masa depan dan hasil belajarmu, tapi kamu tidak harus memikul semua kekhawatiran itu sendirian malam ini.',
        tips: [
          'Latihan Napas 4-7-8: Tarik napas hening lewat hidung selama 4 detik, tahan 7 detik, lalu hembuskan perlahan selama 8 detik.',
          'Grounding 5 Indera: Sebutkan 5 benda yang kamu lihat di mejamu, 4 yang bisa disentuh, dan 3 suara yang terdengar.',
          isExam
            ? 'Fokus pada apa yang bisa dikontrol: Nilai besok adalah hasil proses, yang penting malam ini istirahat agar otakmu fresh.'
            : 'Tuliskan rasa cemasmu di secarik kertas, lipat rapi, dan simpan di laci sampai besok pagi.'
        ]
      },
      overwhelmed: {
        label: 'Overwhelmed (Kewalahan)',
        baseValidation: 'Melihat setumpuk tugas dan materi yang belum selesai memang bisa membuat kepala terasa seperti mau meledak. Tarik napas perlahan; kamu tidak perlu menaklukkan seluruh gunung hari ini, cukup selesaikan satu batu kecil terlebih dahulu.',
        tips: [
          'Aturan 1 Tugas: Pilih HANYA SATU hal paling kecil dan luangkan 10 menit saja tanpa memikirkan tugas yang lain.',
          'Sembunyikan buku lain: Taruh buku atau tab pelajaran lain di luar jangkauan pandangan agar mejamu lapang.',
          'Katakan pada diri sendiri: "Satu langkah kecil sudah cukup untuk hari ini, aku tidak harus sempurna."'
        ]
      },
      exhausted: {
        label: 'Exhausted (Energi Habis)',
        baseValidation: 'Kondisi energimu yang berada di titik terendah adalah alarm alami dari tubuhmu yang meminta belas kasihan. Jangan memaksakan diri membaca materi saat matamu perih, karena istirahat adalah bagian penting dari proses belajar yang efektif.',
        tips: [
          'Jauhkan layar gawai: Pejamkan mata dan dengarkan suara sekitar atau musik tenang tanpa melihat layar.',
          'Cukupi hidrasi & basuh muka: Minum segelas air hangat dan basuh wajah dengan air sejuk untuk menyegarkan saraf.',
          isSleep
            ? 'Prioritaskan tidur lebih awal: 7 jam tidur malam ini jauh lebih berharga daripada 3 jam begadang dengan pemahaman kosong.'
            : 'Rebahkan badan tanpa beban selama 15 menit untuk membiarkan otot leher dan pundakmu lemas.'
        ]
      },
      demotivated: {
        label: 'Demotivated (Kehilangan Motivasi)',
        baseValidation: 'Merasa hampa atau kehilangan alasan untuk belajar adalah fase yang dialami oleh hampir semua siswa SMA. Tidak apa-apa jika hari ini semangatmu sedang meredup; motivasi bukan sesuatu yang selalu ada setiap hari, dan kamu tetap berharga walau sedang melambat.',
        tips: [
          'Aturan 2 Menit: Buka buku dan baca SATU kalimat saja, lalu boleh tutup kembali jika memang belum ada energi.',
          'Ubah suasana belajar: Pindah posisi duduk, rapikan meja belajarmu, atau putar playlist lo-fi yang menenangkan.',
          'Ingatkan alasan awalanmu: Tulis di secarik sticky note impian atau hal kecil yang ingin kamu capai setelah lulus.'
        ]
      }
    };

    const selected = emotionMap[emotion] || emotionMap.burnout;

    return res.json({
      notesForYou: selected.baseValidation,
      smallSteps: selected.tips
    });
  } catch (error) {
    console.error('Screening route error:', error);
    return res.status(500).json({
      error: 'Terjadi kendala teknis saat memproses ceritamu. Silakan coba kembali sejenak lagi.'
    });
  }
});

// Vite middleware setup for development, and static file server for production
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AKASA server running on http://localhost:${PORT}`);
  });
}

startServer();
