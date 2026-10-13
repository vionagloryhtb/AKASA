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

// System prompt for Page 2 (Ruang Curhat & Refleksi Emosi)
const AKASA_SYSTEM_PROMPT = `Kamu adalah AKASA, teman dekat dan pendamping refleksi emosi privat untuk siswa SMA.
Gaya komunikasimu:
1. Sangat empatik, santai, hangat, dan dekat seperti sahabat/kakak yang tulus (hindari kesan robotik, kaku, menggurui, atau bahasa klinis rumit). Gunakan kata sapaan 'kamu'.
2. Validasi perasaan pengguna secara tulus dan akui perjuangan mereka di sekolah.
3. Berikan analisis emosi yang jernih dan saran coping yang sangat spesifik, personal, dan realistis untuk anak SMA.
4. Di akhir, berikan tepat 1 pertanyaan panduan reflektif yang lembut untuk membantu siswa mengenali diri lebih dalam.
5. Format jawaban harus ringkas, terstruktur rapi, dan nyaman dibaca di layar HP tanpa paragraf yang terlalu panjang.
6. Hindari penggunaan simbol em-dash seperti tanda pisah panjang.`;

// API endpoint for AKASA AI screening (Ruang Curhat & Refleksi Emosi)
app.post('/api/screening', async (req: Request, res: Response) => {
  try {
    const { emotion, story } = req.body;

    if (!story || typeof story !== 'string') {
      return res.status(400).json({ error: 'Cerita tidak boleh kosong' });
    }

    const ai = getGeminiClient();

    if (ai) {
      try {
        const prompt = `Emosi dominan siswa: ${emotion || 'Stres Akademik'}\nCerita curhat siswa SMA: "${story}"\n\nInstruksi balasan:
- notesForYou: Validasi emosi yang hangat, personal, dan dekat (2-3 kalimat ringkas, tidak kaku).
- smallSteps: Tepat 3 saran coping personal yang spesifik, praktis, dan langsung dapat dilakukan siswa SMA hari ini.
- reflectiveQuestion: Tepat 1 pertanyaan panduan reflektif yang lembut dan bermakna untuk mengurai isi hatinya.
- Pastikan tidak menggunakan karakter tanda pisah em-dash.`;

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 6000)
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
                  description: 'Validasi emosi yang hangat, personal, dan dekat untuk siswa SMA',
                },
                smallSteps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.STRING,
                  },
                  description: '3 saran coping personal yang spesifik dan praktis',
                },
                reflectiveQuestion: {
                  type: Type.STRING,
                  description: '1 pertanyaan panduan reflektif yang lembut di akhir',
                },
              },
              required: ['notesForYou', 'smallSteps', 'reflectiveQuestion'],
            },
          },
        });

        const response: any = await Promise.race([geminiPromise, timeoutPromise]);
        const rawText = response.text || '';
        const parsed = JSON.parse(rawText);

        return res.json({
          notesForYou: parsed.notesForYou || 'Terima kasih sudah mau berbagi ceritamu ke AKASA. Ngerasa lelah dan cemas di tengah padatnya tugas sekolah itu wajar banget, dan perasaanmu ini beneran valid.',
          smallSteps: Array.isArray(parsed.smallSteps) && parsed.smallSteps.length >= 3
            ? parsed.smallSteps.slice(0, 3)
            : [
                'Tutup buku dan istirahatkan mata selama 10 menit tanpa membuka sosmed.',
                'Pilih satu tugas yang paling ringan dulu, selesaikan pelan-pelan tanpa panik.',
                'Minum segelas air putih hangat dan lemaskan bahu yang tegang.'
              ],
          reflectiveQuestion: parsed.reflectiveQuestion || 'Dari semua beban tugas saat ini, hal apa yang sebenarnya paling menguras energimu hari ini?',
        });
      } catch (geminiError) {
        console.warn('Gemini API call returned or timed out, activating contextual psychoeducational responder');
      }
    }

    // High quality empathetic contextual fallback tailored for high school students
    const lowerStory = story.toLowerCase();
    const isExam = lowerStory.includes('ujian') || lowerStory.includes('ulangan') || lowerStory.includes('test') || lowerStory.includes('uts') || lowerStory.includes('uas');
    const isDeadline = lowerStory.includes('deadline') || lowerStory.includes('tugas') || lowerStory.includes('pr') || lowerStory.includes('banyak') || lowerStory.includes('numpuk');
    const isSleep = lowerStory.includes('tidur') || lowerStory.includes('begadang') || lowerStory.includes('ngantuk') || lowerStory.includes('mata');

    const emotionMap: Record<string, { label: string; baseValidation: string; tips: string[]; question: string }> = {
      burnout: {
        label: 'Burnout',
        baseValidation: 'Aku paham banget rasanya. Mengalami burnout di masa SMA itu tanda kalau kamu udah berjuang mati-matian sampai bateraimu habis. Kamu manusia biasa, bukan robot tugas, jadi istirahat sejenak itu hakmu.',
        tips: [
          'Ambil jeda tanpa rasa bersalah: Berhenti total belajar selama 20 menit sekarang juga, tubuhmu butuh pulih.',
          'Pindah tempat duduk: Menjauh dari meja belajar ke dekat jendela atau teras agar dapat udara segar.',
          'Ucapkan terima kasih ke dirimu: Apresiasi tubuh dan pikiranmu yang sudah bertahan berjuang sejauh ini.'
        ],
        question: 'Kalau sekarang kamu boleh meminta satu hal tanpa beban tugas, apa yang paling ingin kamu lakukan untuk menyenangkan dirimu?'
      },
      anxious: {
        label: 'Anxious (Kecemasan)',
        baseValidation: 'Wajar banget kalau dadamu terasa berdebar atau pikiranmu ke mana-mana mikirin hasil nanti. Rasa cemas ini muncul karena kamu peduli, tapi kamu nggak harus memikul semua kekhawatiran itu sendirian malam ini.',
        tips: [
          'Tarik napas 4-7-8: Hirup napas lewat hidung 4 detik, tahan 7 detik, lalu buang pelan-pelan 8 detik.',
          'Teknik 5 indera: Sebutkan 5 benda di mejamu, 4 yang bisa disentuh, dan 3 suara di sekitarmu.',
          isExam
            ? 'Fokus pada hal yang bisa kamu kontrol: Yang penting malam ini istirahat agar otakmu segar saat ujian.'
            : 'Tuliskan rasa cemasmu di secarik kertas, lipat rapi, dan simpan di laci sampai besok pagi.'
        ],
        question: 'Kira-kira apa ketakutan paling besar yang sedang berputar di kepalamu sekarang, dan apakah itu pasti terjadi?'
      },
      overwhelmed: {
        label: 'Overwhelmed (Kewalahan)',
        baseValidation: 'Melihat tumpukan materi dan tugas yang datang berbarengan emang bikin kepala pusing banget. Tarik napas pelan ya; kamu nggak perlu bereskan semuanya dalam semalam, cukup cicil satu hal kecil dulu.',
        tips: [
          'Aturan 1 tugas: Pilih HANYA SATU hal paling kecil dan luangkan 10 menit saja tanpa mikirin tugas lain.',
          'Sembunyikan buku lain: Singkirkan buku atau tab browser lain dari pandangan agar mejamu lega.',
          'Katakan pada diri sendiri: Satu langkah kecil malam ini sudah cukup, aku nggak harus sempurna.'
        ],
        question: 'Dari semua daftar tugasmu, tugas mana yang kalau dicicil 15 menit saja sudah bikin bebanmu terasa lebih ringan?'
      },
      exhausted: {
        label: 'Sad / Down (Sedih & Murung)',
        baseValidation: 'Aku paham banget rasanya. Menghadapi nilai ulangan atau ekspektasi yang nggak sesuai harapan itu memang bikin nyesek dan wajar kalau kamu merasa sedih. Nilai di atas kertas sama sekali nggak mendefinisikan seberapa berharganya dirimu sebagai manusia.',
        tips: [
          'Beri izin untuk bersedih: Menangis atau menyendiri sejenak itu manusiawi, nggak perlu dipaksa langsung tersenyum.',
          'Pisahkan nilai dan dirimu: Kertas ulangan cuma menguji materi hari itu, bukan masa depan atau potensimu.',
          'Sensori hangat: Mandi air hangat atau minum teh hangat untuk menenangkan sistem saraf yang sedang rapuh.'
        ],
        question: 'Kalau sahabat terbaikmu ada di posisimu sekarang, kalimat penguat apa yang ingin kamu sampaikan padanya?'
      },
      demotivated: {
        label: 'Procrastination (Menunda Tugas)',
        baseValidation: 'Ngerasa terjebak scrolling sosmed padahal deadline tugas makin dekat itu bukan berarti kamu pemalas. Otakmu lagi berusaha menghindar dari rasa stres dan cemas yang berat. Nggak apa-apa, yuk kita urai pelan-pelan.',
        tips: [
          'Aturan 2 menit: Janjikan ke diri sendiri hanya akan buka dokumen tugas dan ketik 1 kalimat pembuka saja.',
          'Jauhkan gawai 30 menit: Titipkan HP ke ruangan lain agar otakmu nggak terus tergiur dopamin instan.',
          'Izinkan draf jelek: Nggak harus langsung sempurna, draf yang berantakan tetap jauh lebih baik daripada kertas kosong.'
        ],
        question: 'Kira-kira apa hal yang paling kamu takuti jika mulai menyentuh tugas itu sekarang?'
      }
    };

    const selected = emotionMap[emotion] || emotionMap.burnout;

    return res.json({
      notesForYou: selected.baseValidation,
      smallSteps: selected.tips,
      reflectiveQuestion: selected.question
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
