import React, { useState, useRef } from 'react';
import { EmotionType, ScreeningResult } from '../types';
import { EMOTIONS, getEmotionById } from '../data/emotions';
import { RotateCcw, Copy, Check, ShieldCheck, AlertCircle, CheckSquare, MessageCircle, HelpCircle, Heart, ArrowRight } from 'lucide-react';

interface AkasaAIProps {
  selectedEmotion: EmotionType;
  onSelectEmotion: (emotion: EmotionType) => void;
  onGoToEdukasi?: () => void;
}

export const AkasaAI: React.FC<AkasaAIProps> = ({
  selectedEmotion,
  onSelectEmotion,
  onGoToEdukasi
}) => {
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const outputRef = useRef<HTMLDivElement>(null);

  const quickStarters = [
    'Tugas sekolah menumpuk bersamaan',
    'Cemas menghadapi ulangan harian',
    'Merasa burnout dan kehilangan motivasi',
    'Takut mengecewakan orang tua',
    'Lelah fisik tapi sulit tidur nyenyak'
  ];

  const handleScreeningSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!story.trim()) {
      setErrorMsg('Tolong ceritakan sedikit apa yang sedang kamu rasakan ya...');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setResult(null);

    try {
      const response = await fetch('/api/screening', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emotion: selectedEmotion,
          story: story.trim()
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi teman AI AKASA.');
      }

      const data: ScreeningResult = await response.json();
      setResult(data);
      setCompletedSteps({});

      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kendala saat merespons cerita.';
      setErrorMsg(`${message} Silakan coba lagi ya.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStory('');
    setResult(null);
    setErrorMsg(null);
    setCompletedSteps({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyResult = () => {
    if (!result) return;
    const textToCopy = `[Refleksi Emosi AKASA - ${result.emotionIdentified.toUpperCase()}]\n\nPesan untukmu:\n"${result.notesForYou}"\n\nLangkah kecil yang bisa dicoba:\n${result.smallSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nPertanyaan Refleksi:\n"${result.reflectiveQuestion || '-'}"`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleStepCompleted = (index: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleQuickStarterClick = (promptText: string) => {
    if (!story) {
      setStory(`Hari ini rasanya berat karena ${promptText.toLowerCase()}... `);
    } else {
      setStory(prev => `${prev} (${promptText})`);
    }
  };

  return (
    <div id="page-curhat" className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Banner Penjelas Ruang Curhat: Soft Lavender Tint */}
        <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-[#F0EEF8]/80 border border-[#4A3E7D]/12 shadow-warm-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#4A3E7D] text-white shadow-xs shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#4A3E7D] font-geometric">
                Ruang Curhat & Refleksi Emosi
              </p>
            </div>
          </div>

          {onGoToEdukasi && (
            <button
              type="button"
              onClick={onGoToEdukasi}
              className="text-xs font-semibold text-[#4A3E7D] hover:underline self-end sm:self-auto cursor-pointer flex items-center gap-1 shrink-0"
            >
              <span>Lihat Materi Edukasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Section Header: Modern Geometric Sans-Serif */}
        <div className="text-center mb-10 md:mb-12">
          <span className="text-xs font-bold tracking-widest text-[#4A3E7D] uppercase mb-2 block font-geometric">
            Ruang Cerita Privat
          </span>
          <h1
            id="screening-title"
            className="font-geometric text-2xl sm:text-4xl font-extrabold text-[#221F1F] tracking-tight mb-3"
          >
            Tumpahkan Apapun yang Mengganjal di Hatimu
          </h1>
          <p className="text-sm sm:text-base text-[#221F1F]/70 max-w-xl mx-auto leading-[1.6]">
            Tidak ada tuntutan untuk selalu kuat atau terlihat sempurna. Ceritakan apa adanya tentang sekolah, tugas, atau rasa lelahmu hari ini.
          </p>
        </div>

        {/* Main Chat/Story Form Centered & Enlarged */}
        <div className="max-w-3xl mx-auto">
          <div
            id="akasa-ai-card-container"
            className="bg-white/95 rounded-3xl p-6 sm:p-10 shadow-soft-float border border-[#4A3E7D]/12 relative text-left"
          >
            <form onSubmit={handleScreeningSubmit} className="space-y-6">
              {/* Emotion Selector */}
              <div id="step-1-container">
                <div className="mb-3">
                  <label className="text-sm sm:text-base font-bold text-[#221F1F] block mb-1 font-geometric">
                    1. Pilih emosi dominanmu saat ini:
                  </label>
                  <p className="text-xs text-[#221F1F]/60 leading-[1.6]">
                    Membantu AKASA merespons dengan sudut pandang yang paling pas.
                  </p>
                </div>

                {/* 5 Pill Buttons */}
                <div className="flex flex-wrap gap-2">
                  {EMOTIONS.map((item) => {
                    const isSelected = selectedEmotion === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        id={`pill-emotion-${item.id}`}
                        onClick={() => onSelectEmotion(item.id)}
                        className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-300 ease-in-out cursor-pointer active:scale-95 ${
                          isSelected
                            ? 'text-white shadow-xs ring-2 scale-102'
                            : 'bg-[#FAF8F5] text-[#221F1F]/80 hover:bg-[#4A3E7D]/10 hover:text-[#4A3E7D] border border-[#4A3E7D]/12'
                        }`}
                        style={
                          isSelected
                            ? {
                                backgroundColor: item.accentColor.primary,
                                borderColor: item.accentColor.primary,
                              }
                            : undefined
                        }
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-[#221F1F]/65 mt-2.5 pl-0.5 leading-[1.6]">
                  Terpilih: <strong className="text-[#221F1F] font-bold">{getEmotionById(selectedEmotion).label}</strong> ({getEmotionById(selectedEmotion).indonesianTitle}) : {getEmotionById(selectedEmotion).description}
                </p>
              </div>

              {/* Story Input */}
              <div id="step-2-container">
                <div className="mb-2.5">
                  <label
                    htmlFor="user-story-input"
                    className="text-sm sm:text-base font-bold text-[#221F1F] block mb-1 font-geometric"
                  >
                    2. Ceritakan apa yang sedang kamu alami:
                  </label>
                  <p className="text-xs text-[#221F1F]/60 leading-[1.6]">
                    Tulis bebas apa saja: tugas, ulangan, pertemanan, atau rasa hampa yang sulit dijelaskan.
                  </p>
                </div>

                {/* High School Quick Starters */}
                <div className="flex items-center gap-1.5 flex-wrap mb-3">
                  <span className="text-[11px] text-[#221F1F]/50 font-medium">Bantuan ide:</span>
                  {quickStarters.map((qs, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleQuickStarterClick(qs)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-[#FAF8F5] hover:bg-[#4A3E7D]/10 text-[#221F1F]/70 hover:text-[#4A3E7D] border border-[#4A3E7D]/12 transition-all duration-300 cursor-pointer"
                    >
                      + {qs}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <textarea
                    id="user-story-input"
                    rows={5}
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Ketik apa saja yang ada di kepalamu saat ini. Nggak perlu tersusun rapi atau takut salah..."
                    className="w-full p-4 rounded-2xl border border-[#4A3E7D]/15 bg-[#FAF8F5]/60 text-[#221F1F] text-sm sm:text-base placeholder:text-[#221F1F]/40 focus:outline-none focus:ring-2 focus:ring-[#4A3E7D]/30 focus:border-[#4A3E7D] focus:bg-white transition-all resize-y leading-[1.6]"
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-rose-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="flex items-center justify-between mt-2 px-1 text-xs text-[#221F1F]/50">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1E7E45]" /> Curhatan privat & aman
                  </span>
                  <span>{story.length} karakter</span>
                </div>
              </div>

              {/* Action Button */}
              <div id="step-3-action">
                <button
                  type="submit"
                  id="submit-screening-btn"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#4A3E7D] hover:bg-[#3D3268] text-white text-sm sm:text-base font-bold shadow-xs hover:shadow-md disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center gap-2 group active:scale-99"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                      <span>AKASA sedang mendengarkan ceritamu...</span>
                    </span>
                  ) : (
                    <span>Kirim Cerita & Temukan Langkah Tenang</span>
                  )}
                </button>
              </div>
            </form>

            {/* Output Area (Mobile-Optimized, Concise & Empathetic) */}
            {result && (
              <div
                ref={outputRef}
                id="screening-output-container"
                className="mt-8 pt-6 border-t border-[#4A3E7D]/10 animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <div
                  id="screening-output-box"
                  className="p-6 sm:p-7 rounded-2xl bg-[#F0EEF8]/60 border border-[#4A3E7D]/12 space-y-5"
                >
                  {/* Header Tag */}
                  <div className="flex items-center justify-between border-b border-[#4A3E7D]/10 pb-3">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#4A3E7D] flex items-center gap-1.5 font-geometric">
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                        Respons Hangat AKASA
                      </span>
                      <span className="text-[11px] text-[#221F1F]/50 ml-5 block sm:inline sm:ml-2">
                        Waktu refleksi: {result.timestamp}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id="copy-result-btn"
                        onClick={handleCopyResult}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-xs font-semibold text-[#221F1F]/80 border border-[#4A3E7D]/15 hover:border-[#4A3E7D]/35 transition cursor-pointer shadow-xs"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#1E7E45]" />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>

                      <button
                        id="reset-screening-btn"
                        onClick={handleReset}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white text-xs font-semibold text-[#221F1F]/70 border border-[#4A3E7D]/15 hover:text-[#4A3E7D] transition cursor-pointer shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Ulangi</span>
                      </button>
                    </div>
                  </div>

                  {/* Validasi Emosi (Notes for You) */}
                  <div id="output-notes-section">
                    <h3 className="text-sm sm:text-base font-bold text-[#221F1F] mb-2 font-geometric">
                      Pesan untuk Dirimu:
                    </h3>
                    <div className="text-xs sm:text-sm text-[#221F1F]/90 leading-[1.6] bg-white/95 p-4 sm:p-5 rounded-2xl border border-[#4A3E7D]/8 italic">
                      &ldquo;{result.notesForYou}&rdquo;
                    </div>
                  </div>

                  {/* Saran Coping Spesifik & Praktis */}
                  <div id="output-steps-section">
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <h3 className="text-sm sm:text-base font-bold text-[#221F1F] font-geometric">
                        Saran Coping yang Bisa Kamu Coba Sekarang:
                      </h3>
                      <span className="text-[11px] text-[#221F1F]/50 hidden sm:inline">
                        Centang jika sudah dicoba
                      </span>
                    </div>

                    <div className="space-y-2">
                      {result.smallSteps.map((step, idx) => {
                        const isDone = !!completedSteps[idx];
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleStepCompleted(idx)}
                            className={`flex items-start gap-2.5 p-3.5 rounded-xl border transition-all cursor-pointer ${
                              isDone
                                ? 'bg-[#E2F1E8]/70 border-[#1E7E45]/20 text-[#221F1F]/60 line-through'
                                : 'bg-white border-[#4A3E7D]/10 text-[#221F1F]/90 hover:border-[#4A3E7D]/30'
                            } text-xs sm:text-sm leading-[1.6]`}
                          >
                            <div className="shrink-0 mt-0.5">
                              {isDone ? (
                                <CheckSquare className="w-4 h-4 text-[#1E7E45]" />
                              ) : (
                                <span className="w-4 h-4 rounded-full bg-[#4A3E7D]/10 text-[#4A3E7D] text-[11px] font-bold flex items-center justify-center">
                                  {idx + 1}
                                </span>
                              )}
                            </div>
                            <span className="flex-grow">{step}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pertanyaan Panduan Reflektif di Akhir (1 Pertanyaan) */}
                  {result.reflectiveQuestion && (
                    <div id="output-reflection-section" className="p-4 rounded-2xl bg-white border border-[#4A3E7D]/20 shadow-xs">
                      <div className="flex items-center gap-2 mb-1.5">
                        <HelpCircle className="w-4 h-4 text-[#4A3E7D]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3E7D] font-geometric">
                          1 Pertanyaan Refleksi untuk Dirimu
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-[#221F1F] italic leading-[1.6]">
                        {result.reflectiveQuestion}
                      </p>
                    </div>
                  )}

                  <div className="pt-1 text-center text-xs text-[#221F1F]/60 leading-[1.6]">
                    Satu helaan napas tenang dan satu langkah kecil sudah sangat berarti untuk hari ini.
                  </div>
                </div>
              </div>
            )}

            {/* Prinsip Privasi Reassurance */}
            <div className="mt-6 pt-5 border-t border-[#4A3E7D]/10 flex items-center justify-center sm:justify-start gap-2.5 text-xs text-[#221F1F]/65 text-center sm:text-left">
              <span className="flex items-center gap-1.5 font-medium text-[#221F1F]/85">
                <ShieldCheck className="w-4 h-4 text-[#1E7E45] shrink-0" />
                <span>Prinsip Privasi: Ceritamu 100% rahasia dan tidak dipublikasikan ke siapapun.</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
