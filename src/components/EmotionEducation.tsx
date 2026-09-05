import React, { useState } from 'react';
import { EMOTIONS } from '../data/emotions';
import { EmotionInfo, EmotionType } from '../types';
import { ChevronRight, MessageSquareHeart } from 'lucide-react';

interface EmotionEducationProps {
  onSelectEmotionForScreening: (emotion: EmotionType) => void;
}

export const EmotionEducation: React.FC<EmotionEducationProps> = ({
  onSelectEmotionForScreening
}) => {
  const [activeDetailsId, setActiveDetailsId] = useState<EmotionType | null>(null);

  const toggleDetails = (id: EmotionType) => {
    setActiveDetailsId((prev) => (prev === id ? null : id));
  };

  const studentQuotes: Record<string, string> = {
    burnout: '“Buka buku rasanya hampa, pikiran kosong meskipun ujian kimia besok...”',
    anxious: '“Jantung deg-degan waktu guru bilang ada kuis dadakan yang masuk rapor...”',
    overwhelmed: '“Tugas sekolah, les, dan ekskul numpuk bersamaan, bingung mau mulai dari mana...”',
    exhausted: '“Kepala berat, mata perih, pengen tidur tapi dihantui rasa bersalah belum belajar...”',
    demotivated: '“Kehilangan alasan kenapa harus berjuang keras tiap hari kalau hasilnya segini-gini aja...”'
  };

  return (
    <section
      id="literasi-emosi"
      className="py-16 md:py-24 bg-[#FAF8F6] border-t border-[#221F1F]/6 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-xs font-bold tracking-widest text-[#6851A4] uppercase mb-2">
            Pojok Refleksi
          </p>
          <h2
            id="education-title"
            className="font-serif text-2xl sm:text-4xl font-bold text-[#221F1F] tracking-tight mb-3"
          >
            Mengenali Apa yang Sedang Terjadi di Dalam Dirimu
          </h2>
          <p
            id="education-subtitle"
            className="text-sm sm:text-base text-[#221F1F]/70 leading-relaxed font-serif italic"
          >
            Sering kali kita hanya merasa lelah tanpa tahu persis apa penyebabnya. Pilih respon yang paling mendekati apa yang kamu rasakan hari ini:
          </p>
        </div>

        {/* 5 Cards Grid with intentional human craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EMOTIONS.map((item: EmotionInfo) => {
            const isExpanded = activeDetailsId === item.id;
            const quote = studentQuotes[item.id];

            return (
              <div
                key={item.id}
                id={`emotion-card-${item.id}`}
                className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-7 shadow-warm-card border border-[#221F1F]/6 transition-all duration-300 hover:shadow-warm-card-hover flex flex-col justify-between group hover:-translate-y-0.5"
              >
                <div>
                  {/* Card Header Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#6851A4]/10 text-[#6851A4]">
                      {item.indonesianTitle}
                    </span>
                    <span className="text-[11px] text-[#221F1F]/45 font-medium">
                      Refleksi Emosi
                    </span>
                  </div>

                  {/* Emotion Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#221F1F] mb-1.5">
                    {item.label}
                  </h3>

                  {/* Relatable Student Voice Snippet */}
                  {quote && (
                    <p className="font-serif italic text-xs text-[#6851A4] leading-relaxed mb-3">
                      {quote}
                    </p>
                  )}

                  {/* Core Description from prompt */}
                  <p className="text-sm text-[#221F1F]/80 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Collapsible Details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-[#221F1F]/8 space-y-3.5 animate-in fade-in duration-300">
                      <div>
                        <p className="text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-2">
                          Tanda yang Sering Muncul:
                        </p>
                        <ul className="space-y-1.5">
                          {item.signs.map((sign, sIdx) => (
                            <li key={sIdx} className="text-xs text-[#221F1F]/75 flex items-start gap-2">
                              <span className="text-[#6851A4] mt-0.5 leading-none font-bold">•</span>
                              <span>{sign}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#FAF8F6] border border-[#221F1F]/8">
                        <p className="text-xs font-bold text-[#6851A4] mb-1">
                          Langkah Meredakan:
                        </p>
                        <p className="text-xs text-[#221F1F]/85 leading-relaxed">
                          {item.immediateReliefTip}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-[#221F1F]/6 flex items-center justify-between gap-3">
                  <button
                    id={`toggle-detail-${item.id}`}
                    onClick={() => toggleDetails(item.id)}
                    className="text-xs font-semibold text-[#221F1F]/65 hover:text-[#6851A4] transition-colors cursor-pointer py-1"
                  >
                    {isExpanded ? 'Tutup Rincian' : 'Lihat Tanda-Tanda'}
                  </button>

                  <button
                    id={`select-screening-${item.id}`}
                    onClick={() => onSelectEmotionForScreening(item.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#6851A4] text-white text-xs font-bold transition-all cursor-pointer hover:bg-[#574193] shadow-xs"
                  >
                    <span>Curhatkan Ini</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supportive Note */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-[#221F1F]/60 max-w-xl mx-auto">
            Wajar jika kamu merasakan percampuran antara 2 atau lebih emosi di atas. Di AKASA, pilih yang paling dominan mengganggu pikiranmu saat ini.
          </p>
        </div>
      </div>
    </section>
  );
};
