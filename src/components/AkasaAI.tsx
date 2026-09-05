import React, { useState, useRef } from 'react';
import { EmotionType, ScreeningResult } from '../types';
import { EMOTIONS, getEmotionById } from '../data/emotions';
import { RotateCcw, Copy, Check, ShieldCheck, AlertCircle, CheckSquare, Square } from 'lucide-react';

interface AkasaAIProps {
  selectedEmotion: EmotionType;
  onSelectEmotion: (emotion: EmotionType) => void;
}

export const AkasaAI: React.FC<AkasaAIProps> = ({
  selectedEmotion,
  onSelectEmotion
}) => {
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const outputRef = useRef<HTMLDivElement>(null);

  const quickStarters = [
    'Tugas menumpuk & besok ulangan',
    'Merasa tertinggal dari teman kelas',
    'Kepala berat & kurang tidur',
    'Cemas dengan ekspektasi orang tua'
  ];

  const handleScreeningSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!story.trim()) {
      setErrorMsg('Tuliskan sedikit apa yang kamu rasakan atau alami hari ini.');
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/screening', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emotion: selectedEmotion,
          story: story.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi AKASA AI');
      }

      const data = await response.json();
      setResult({
        emotion: selectedEmotion,
        emotionLabel: getEmotionById(selectedEmotion).label,
        story: story.trim(),
        notesForYou: data.notesForYou,
        smallSteps: data.smallSteps || [],
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      });
      setCompletedSteps({});

      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error('Error calling AKASA AI screening:', err);
      // Empathetic client fallback tailored for SMA students
      const emotionMeta = getEmotionById(selectedEmotion);
      const fallbackResult: ScreeningResult = {
        emotion: selectedEmotion,
        emotionLabel: emotionMeta.label,
        story: story.trim(),
        notesForYou: `Terima kasih sudah berani membuka ceritamu. Menghadapi situasi sekolah dengan perasaan ${emotionMeta.label.toLowerCase()} memang tidak mudah, dan kamu berhak merasa lelah atau cemas saat ini. Ingatlah bahwa nilai atau tugas yang sedang menumpuk tidak mendefinisikan seberapa berharganya dirimu sebagai manusia.`,
        smallSteps: [
          `Istirahat hening 10 menit: Lepaskan gadget dan buku, pejamkan mata, lalu tarik napas panjang perlahan sebanyak 5 kali.`,
          `Pilah 1 hal paling kecil: Dari semua hal yang membebani, pilih satu saja yang bisa selesai dalam 5 menit, kesampingkan sisanya untuk hari ini.`,
          `Minum air hangat & peregangan: Berdiri dari meja belajarmu, putar bahu ke belakang, dan rasakan kembali ketegangan di lehermu mulai mengendur.`
        ],
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };

      setResult(fallbackResult);
      setCompletedSteps({});
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyResult = () => {
    if (!result) return;
    const textToCopy = `[Catatan AKASA untuk Kamu]\n${result.notesForYou}\n\n[Langkah Kecil yang Bisa Kamu Coba]\n${result.smallSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setStory('');
    setResult(null);
    setErrorMsg(null);
    setCompletedSteps({});
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
    <section
      id="skrining-ai"
      className="py-16 md:py-24 bg-[#FAF8F6] border-t border-[#221F1F]/6 scroll-mt-16"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest text-[#6851A4] uppercase mb-2">
            Ruang Cerita Pribadi
          </p>
          <h2
            id="screening-title"
            className="font-serif text-2xl sm:text-4xl font-bold text-[#221F1F] tracking-tight mb-3"
          >
            Luapkan yang Mengganjal di Hatimu
          </h2>
          <p className="text-sm sm:text-base text-[#221F1F]/70 max-w-xl mx-auto leading-relaxed">
            Tidak ada penilaian atau keharusan untuk terlihat sempurna. Tuliskan apa adanya apa yang sedang membebani pikiranmu belakangan ini.
          </p>
        </div>

        {/* Main White Card Container */}
        <div
          id="akasa-ai-card-container"
          className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-10 shadow-warm-card border border-[#221F1F]/6 transition-all relative"
        >
          <form onSubmit={handleScreeningSubmit} className="space-y-8">
            {/* Emotion Selector */}
            <div id="step-1-container">
              <div className="mb-3.5">
                <label className="text-base sm:text-lg font-serif font-bold text-[#221F1F] block mb-1">
                  Bagaimana suasana hatimu saat ini?
                </label>
                <p className="text-xs text-[#221F1F]/60">
                  Pilih kondisi yang paling mendominasi agar respon terasa pas untukmu:
                </p>
              </div>

              {/* 5 Pill Buttons */}
              <div className="flex flex-wrap gap-2.5">
                {EMOTIONS.map((item) => {
                  const isSelected = selectedEmotion === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      id={`pill-emotion-${item.id}`}
                      onClick={() => onSelectEmotion(item.id)}
                      className={`px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#6851A4] text-white shadow-sm ring-2 ring-[#6851A4]/30'
                          : 'bg-[#FAF8F6] text-[#221F1F]/80 hover:bg-[#221F1F]/5 border border-[#221F1F]/8'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-[#221F1F]/65 mt-2.5 pl-1">
                Terpilih: <strong className="text-[#221F1F]">{getEmotionById(selectedEmotion).label}</strong> ({getEmotionById(selectedEmotion).indonesianTitle}) — {getEmotionById(selectedEmotion).description}
              </p>
            </div>

            {/* Story Input */}
            <div id="step-2-container">
              <div className="mb-2">
                <label
                  htmlFor="user-story-input"
                  className="text-base sm:text-lg font-serif font-bold text-[#221F1F] block mb-1"
                >
                  Tumpahkan apa yang sedang kamu hadapi:
                </label>
                <p className="text-xs text-[#221F1F]/60">
                  Boleh cerita tentang tugas sekolah, guru, ulangan, pertemanan asrama, atau sekadar rasa lelah yang sulit dijelaskan.
                </p>
              </div>

              {/* High School Quick Starters */}
              <div className="flex items-center gap-1.5 flex-wrap mb-3 pl-1">
                <span className="text-[11px] text-[#221F1F]/50 font-medium">Bantuan kalimat awal:</span>
                {quickStarters.map((qs, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleQuickStarterClick(qs)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-[#FAF8F6] hover:bg-[#6851A4]/10 text-[#221F1F]/70 hover:text-[#6851A4] border border-[#221F1F]/8 transition cursor-pointer"
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
                  placeholder="Tulis apa saja yang ada di kepalamu saat ini, tidak perlu rapi atau tersusun..."
                  className="w-full p-4 sm:p-5 rounded-xl border border-[#221F1F]/15 bg-[#FAF8F6]/50 text-[#221F1F] text-base placeholder:text-[#221F1F]/40 focus:outline-none focus:ring-2 focus:ring-[#6851A4]/30 focus:border-[#6851A4] focus:bg-white transition-all resize-y"
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
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Ceritamu rahasia & privat
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
                className="w-full py-4 px-6 rounded-xl bg-[#6851A4] hover:bg-[#574193] text-white text-base sm:text-lg font-bold shadow-md hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2.5 group active:scale-99"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    <span>AKASA sedang membaca ceritamu...</span>
                  </span>
                ) : (
                  <span>Dengarkan Ceritaku & Temukan Solusi</span>
                )}
              </button>
            </div>
          </form>

          {/* Output Area */}
          {result && (
            <div
              ref={outputRef}
              id="screening-output-container"
              className="mt-10 pt-8 border-t border-[#221F1F]/10 animate-in fade-in slide-in-from-bottom-3 duration-500"
            >
              {/* Output Box (#FAF8F6 background as specified in prompt) */}
              <div
                id="screening-output-box"
                className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F6] border border-[#221F1F]/8 shadow-sm space-y-6"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-[#221F1F]/8 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6851A4]">
                      Tanggapan Hangat AKASA
                    </span>
                    <span className="text-[11px] text-[#221F1F]/50 ml-2">
                      {result.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id="copy-result-btn"
                      onClick={handleCopyResult}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-xs font-semibold text-[#221F1F]/80 border border-[#221F1F]/10 hover:border-[#221F1F]/30 transition cursor-pointer shadow-xs"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Solusi</span>
                        </>
                      )}
                    </button>

                    <button
                      id="reset-screening-btn"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white text-xs font-semibold text-[#221F1F]/70 border border-[#221F1F]/10 hover:text-[#6851A4] transition cursor-pointer shadow-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Cerita Baru</span>
                    </button>
                  </div>
                </div>

                {/* Bagian 1: Catatan untuk Kamu */}
                <div id="output-notes-section">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#221F1F] mb-2.5">
                    Catatan untuk Kamu:
                  </h3>
                  <div className="text-sm sm:text-base text-[#221F1F]/90 leading-relaxed bg-white p-4 sm:p-5 rounded-xl border border-[#221F1F]/6 font-serif italic">
                    {result.notesForYou}
                  </div>
                </div>

                {/* Bagian 2: Langkah Kecil yang Bisa Kamu Coba */}
                <div id="output-steps-section">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#221F1F]">
                      Langkah Kecil yang Bisa Kamu Coba:
                    </h3>
                    <span className="text-[11px] text-[#221F1F]/50 hidden sm:inline">
                      Klik kotak untuk menandai yang sudah dicoba
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {result.smallSteps.map((step, idx) => {
                      const isDone = !!completedSteps[idx];
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleStepCompleted(idx)}
                          className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isDone
                              ? 'bg-emerald-50/70 border-emerald-200 text-[#221F1F]/60 line-through'
                              : 'bg-white border-[#221F1F]/6 text-[#221F1F]/90 hover:border-[#6851A4]/30'
                          } text-sm leading-relaxed`}
                        >
                          <div className="shrink-0 mt-0.5">
                            {isDone ? (
                              <CheckSquare className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <span className="w-5 h-5 rounded-full bg-[#6851A4]/10 text-[#6851A4] text-xs font-bold flex items-center justify-center">
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

                {/* Footer encouragement inside card */}
                <div className="pt-2 text-center text-xs text-[#221F1F]/60">
                  Kamu tidak harus menyelesaikan semuanya hari ini. Satu tarikan napas dan satu langkah kecil sudah sangat cukup.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
