import React, { useState } from 'react';
import { EMOTIONS } from '../data/emotions';
import { EmotionInfo, EmotionType } from '../types';
import { BookOpen, Sparkles, Brain, Lightbulb, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { EmotionDetailModal } from './EmotionDetailModal';

interface EmotionEducationProps {
  onSelectEmotionForScreening: (emotion: EmotionType) => void;
  onGoToCurhat?: () => void;
}

export const EmotionEducation: React.FC<EmotionEducationProps> = ({
  onSelectEmotionForScreening,
  onGoToCurhat
}) => {
  const [modalEmotion, setModalEmotion] = useState<EmotionInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetailModal = (emotion: EmotionInfo) => {
    setModalEmotion(emotion);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalEmotion(null);
  };

  const handleCurhatFromModal = (emotionId: EmotionType) => {
    setIsModalOpen(false);
    onSelectEmotionForScreening(emotionId);
  };

  const studentQuotes: Record<string, string> = {
    burnout: '“Buka buku rasanya hampa, pikiran kosong meskipun ujian kimia besok...”',
    anxious: '“Jantung deg-degan waktu guru bilang ada kuis dadakan yang masuk rapor...”',
    overwhelmed: '“Tugas sekolah, les, dan ekskul numpuk bersamaan, bingung mau mulai dari mana...”',
    exhausted: '“Kepala berat, mata perih, pengen tidur tapi dihantui rasa bersalah belum belajar...”',
    demotivated: '“Kehilangan alasan kenapa harus berjuang keras tiap hari kalau hasilnya segini-gini aja...”'
  };

  const stressManagementTips = [
    {
      title: 'Teknik Pomodoro Adaptif (25 + 5 Menit)',
      category: 'Manajemen Waktu',
      icon: Clock,
      desc: 'Belajar fokus selama 25 menit penuh, lalu pasang alarm istirahat 5 menit untuk jalan santai atau minum air. Jangan paksakan maraton 3 jam tanpa jeda karena daya serap otak akan menurun drastis.',
      action: 'Coba pasang timer sekarang untuk 1 sesi materi saja.'
    },
    {
      title: 'Pilah Beban: Urgen vs Penting (Eisenhower)',
      category: 'Prioritas Tugas',
      icon: Lightbulb,
      desc: 'Tulis semua tugas di selembar kertas. Tandai mana yang deadlinenya besok pagi dan mana yang masih minggu depan. Kerjakan satu per satu tanpa membuka tugas lain di meja belajar.',
      action: 'Sembunyikan buku tugas lain agar mejamu tidak terasa penuh.'
    },
    {
      title: 'Metode Stop Prokrastinasi: Aturan 2 Menit',
      category: 'Lawan Malas',
      icon: Brain,
      desc: 'Saat sangat malas menyentuh PR, janjikan pada dirimu hanya akan membuka buku dan membaca 1 lembar atau 2 menit saja. Biasanya rasa berat terbesar hanya ada pada saat memulai.',
      action: 'Buka dokumen tugasmu sekarang dan ketik 1 kalimat pembuka.'
    },
    {
      title: 'Grounding Fisik Saat Panik Menjelang Ujian',
      category: 'Peredam Cemas',
      icon: Sparkles,
      desc: 'Jika napas memburu dan dada berdebar di ruang kelas, letakkan kedua telapak kaki rata di lantai, rasakan sandaran kursi, dan hembuskan napas panjang 3 kali dengan tenang.',
      action: 'Latih pernapasan perlahan di pojok santai sebelum lembar soal dibagikan.'
    }
  ];

  return (
    <div id="page-edukasi" className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Banner Edukasi & Batasan Ruang: Soft Lavender Tint */}
        <div className="mb-12 p-6 sm:p-7 rounded-3xl bg-[#F0EEF8]/80 border border-[#4A3E7D]/12 shadow-warm-card flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-left">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-[#4A3E7D] text-white shadow-xs shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#4A3E7D] font-geometric">
                Edukasi & Pembelajaran
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <span className="text-xs text-[#221F1F]/60 hidden sm:inline">Punya beban yang ingin diceritakan?</span>
            {onGoToCurhat && (
              <button
                type="button"
                onClick={onGoToCurhat}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4A3E7D] text-white text-xs font-bold hover:bg-[#3D3268] transition-all duration-300 ease-in-out cursor-pointer shadow-xs active:scale-95"
              >
                <span>Buka Ruang Curhat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Section Header Literasi Emosi: Modern Sans-Serif & Spacious */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-bold tracking-widest text-[#4A3E7D] uppercase mb-2 block font-geometric">
            Kenali Sinyal Tubuh & Pikiran
          </span>
          <h2
            id="education-title"
            className="font-geometric text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#221F1F] tracking-tight whitespace-normal sm:whitespace-nowrap"
          >
            5 Ragam Emosi Stres Akademik Pelajar SMA
          </h2>
        </div>

        {/* 5 Cards Grid dengan Warna Aksen & Mikro-Interaksi Halus */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-18">
          {EMOTIONS.map((item: EmotionInfo) => {
            const quote = studentQuotes[item.id];

            return (
              <div
                key={item.id}
                id={`emotion-card-${item.id}`}
                className="bg-white/95 rounded-3xl p-6 sm:p-7 border transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-soft-float flex flex-col justify-between group relative overflow-hidden text-left"
                style={{
                  borderColor: item.accentColor.border,
                }}
              >
                {/* Decorative top color accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2"
                  style={{ backgroundColor: item.accentColor.primary }}
                />

                <div className="pt-2">
                  {/* Emotion Title & Subtitle */}
                  <h3 className="font-geometric text-xl sm:text-2xl font-bold text-[#221F1F] mb-1">
                    {item.label}
                  </h3>
                  <p className="text-xs font-medium text-[#221F1F]/60 mb-3">
                    {item.indonesianTitle}
                  </p>

                  {/* Relatable Student Voice Snippet */}
                  {quote && (
                    <p
                      className="italic text-xs leading-[1.6] mb-3.5 p-3 rounded-2xl border border-[#221F1F]/5"
                      style={{
                        backgroundColor: item.accentColor.bgSoft,
                        color: item.accentColor.badgeText
                      }}
                    >
                      {quote}
                    </p>
                  )}

                  {/* Core Description */}
                  <p className="text-xs sm:text-sm text-[#221F1F]/80 leading-[1.6] mb-4">
                    {item.description}
                  </p>

                  {/* Preview Sains Singkat */}
                  <div className="mb-4 pt-3.5 border-t border-[#221F1F]/6 flex items-start gap-2.5 text-xs text-[#221F1F]/70">
                    <Brain className="w-4 h-4 shrink-0 mt-0.5" style={{ color: item.accentColor.primary }} />
                    <span className="line-clamp-2 leading-[1.5]">
                      <strong>Sains:</strong> {emotionBrainSnippet(item)}
                    </span>
                  </div>
                </div>

                {/* Card Actions: Tombol Pelajari Selengkapnya ➔ & Curhat */}
                <div className="mt-4 pt-4 border-t border-[#221F1F]/6 flex items-center justify-between gap-2">
                  <button
                    id={`learn-more-${item.id}`}
                    onClick={() => handleOpenDetailModal(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition-all duration-300 ease-in-out cursor-pointer active:scale-95 group/btn whitespace-nowrap shrink-0"
                    style={{
                      backgroundColor: item.accentColor.bgSoft,
                      color: item.accentColor.badgeText,
                      border: `1px solid ${item.accentColor.border}`
                    }}
                  >
                    <span className="whitespace-nowrap">Pelajari Selengkapnya ➔</span>
                  </button>

                  <button
                    id={`select-screening-${item.id}`}
                    onClick={() => onSelectEmotionForScreening(item.id)}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-white text-xs font-bold transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xs active:scale-95 shadow-2xs"
                    style={{ backgroundColor: item.accentColor.primary }}
                    title="Curhatkan langsung masalah ini ke AI"
                  >
                    <span>Curhat</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Popup Edukasi Mendalam */}
        <EmotionDetailModal
          emotion={modalEmotion}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCurhatClick={handleCurhatFromModal}
        />

        {/* Tips Praktis Manajemen Stres Akademik: Flat, Clean & Spacious (No Box-in-a-Box) */}
        <div className="bg-[#F0EEF8]/60 rounded-3xl border border-[#4A3E7D]/10 p-6 sm:p-10 shadow-warm-card mb-14 text-left">
          <div className="w-full mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4A3E7D] block mb-1.5 font-geometric">
              Strategi Belajar Santai
            </span>
            <h3 className="font-geometric text-xl sm:text-2xl lg:text-[28px] font-extrabold text-[#221F1F] tracking-tight leading-snug md:whitespace-nowrap">
              Tips Praktis Manajemen Stres Belajar Tanpa Bikin Pusing
            </h3>
            <p className="text-sm sm:text-base text-[#221F1F]/70 mt-2 leading-[1.6] w-full xl:whitespace-nowrap">
              Bukan teori buku yang kaku, ini tips yang beneran bisa kamu praktekkan di kamar atau meja kelas pas tugas lagi banyak.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {stressManagementTips.map((tip, idx) => {
              const IconComp = tip.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/95 border border-[#4A3E7D]/10 flex flex-col justify-between transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-soft-float"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="p-2.5 rounded-xl bg-[#4A3E7D]/10 text-[#4A3E7D]">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A3E7D] block">
                          {tip.category}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-[#221F1F] font-geometric">
                          {tip.title}
                        </h4>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#221F1F]/75 leading-[1.6] mt-2 mb-4">
                      {tip.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#4A3E7D]/8 flex items-center gap-2 text-xs text-[#221F1F]/70 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#1E7E45] shrink-0" />
                    <span>{tip.action}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pemberitahuan Ramah: Khusus Membaca Materi, Tidak Menerima Curhat Pribadi */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#E8E2F7]/50 border border-[#4A3E7D]/15 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm sm:text-base font-bold text-[#221F1F] font-geometric">
              Ingin menumpahkan isi hati atau tugas yang lagi bikin cemas?
            </h4>
          </div>
          {onGoToCurhat && (
            <button
              type="button"
              onClick={onGoToCurhat}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4A3E7D] text-white text-xs sm:text-sm font-bold hover:bg-[#3D3268] transition-all duration-300 ease-in-out cursor-pointer shadow-xs hover:shadow-md active:scale-95"
            >
              <span>Menuju Ruang Curhat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

function emotionBrainSnippet(item: EmotionInfo): string {
  switch (item.id) {
    case 'burnout':
      return 'Kortisol berlebih menumpulkan fokus di prefrontal cortex.';
    case 'anxious':
      return 'Amigdala membajak logika dan memicu respons panik.';
    case 'overwhelmed':
      return 'Memori kerja kognitif meluap akibat terlalu banyak stimuli.';
    case 'exhausted':
      return 'Penumpukan adenosin & penipisan cadangan glukosa serebral.';
    case 'demotivated':
      return 'Penurunan dopamin memicu anhedonia akademik sementara.';
    default:
      return item.brainScience.headline;
  }
}
