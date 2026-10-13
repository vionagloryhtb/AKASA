import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw } from 'lucide-react';

interface BreathingSectionProps {
  onGoToCurhat?: () => void;
}

export const BreathingSection: React.FC<BreathingSectionProps> = ({ onGoToCurhat }) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [countdown, setCountdown] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 1) {
            return prev - 1;
          }
          // Transition phases in 4-7-8 rhythm
          if (phase === 'Inhale') {
            setPhase('Hold');
            return 7;
          } else if (phase === 'Hold') {
            setPhase('Exhale');
            return 8;
          } else {
            setPhase('Inhale');
            setCompletedCycles((c) => c + 1);
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phase]);

  const toggleExercise = () => {
    if (!isActive) {
      setPhase('Inhale');
      setCountdown(4);
    }
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase('Inhale');
    setCountdown(4);
    setCompletedCycles(0);
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'Inhale':
        return {
          title: 'Tarik Napas Pelan',
          desc: 'Tarik napas lembut lewat hidung. Rasakan udara segar mengisi rongga dada dan perutmu.',
          color: 'from-[#4A3E7D]/25 to-[#6B5A9E]/15',
          ringColor: 'border-[#4A3E7D]',
          scale: 'scale-115'
        };
      case 'Hold':
        return {
          title: 'Tahan Sebentar',
          desc: 'Tahan napasmu tanpa tegang. Biarkan tubuhmu hening dan detak jantung mulai melambat.',
          color: 'from-[#4A3E7D]/35 to-[#8A79BD]/25',
          ringColor: 'border-[#6B5A9E]',
          scale: 'scale-110'
        };
      case 'Exhale':
        return {
          title: 'Hembuskan Perlahan',
          desc: 'Lepaskan napas perlahan melalui mulut. Bayangkan beban tugas dan rasa tegang ikut menguap.',
          color: 'from-[#1E7E45]/25 to-[#4A3E7D]/15',
          ringColor: 'border-[#1E7E45]',
          scale: 'scale-90'
        };
    }
  };

  const currentInfo = getPhaseInstruction();

  return (
    <section
      id="breathing-section"
      className="relative py-16 md:py-24 bg-[#FAF8F5] overflow-hidden border-t border-[#4A3E7D]/10"
    >
      {/* Ambient background glow shapes */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#E8E2F7] opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#E0F2E9] opacity-25 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header: Modern Geometric Sans-Serif */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#4A3E7D] uppercase mb-3 font-geometric">
            <Wind className="w-4 h-4" />
            <span>Pemberhentian Sejenak</span>
          </div>
          <h2 className="font-geometric text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#221F1F] tracking-tight mb-4 whitespace-normal sm:whitespace-nowrap">
            Teknik Napas 4-7-8 untuk Meredakan Ketegangan
          </h2>
          <p className="text-sm sm:text-base text-[#221F1F]/75 leading-[1.6] max-w-xl mx-auto">
            Saat kepala mau pecah karena tugas dan ujian, coba tarik napas teratur. Tidak sampai semenit, tubuhmu bakal langsung lebih tenang.
          </p>
        </div>

        {/* Breathing Exercise Card: Soft Lavender Tint & Generous Whitespace */}
        <div className="bg-[#F0EEF8]/70 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#4A3E7D]/12 shadow-soft-float max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual Interactive Breathing Circle */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                {/* Outer animated ambient ripple */}
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-1000 bg-gradient-to-br ${
                    isActive ? currentInfo.color : 'from-[#4A3E7D]/10 to-[#6B5A9E]/5'
                  } ${isActive ? currentInfo.scale : 'scale-100'} blur-xl opacity-75`}
                />

                {/* Animated Ring */}
                <div
                  className={`absolute inset-4 rounded-full border-2 transition-all duration-1000 ${
                    isActive ? currentInfo.ringColor : 'border-[#4A3E7D]/20'
                  } ${isActive ? currentInfo.scale : 'scale-100'} opacity-80`}
                />

                {/* Center Core */}
                <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white shadow-xs flex flex-col items-center justify-center border border-[#4A3E7D]/10 text-center">
                  <span className="font-geometric text-3xl sm:text-4xl font-black text-[#4A3E7D]">
                    {isActive ? `${countdown}s` : '4-7-8'}
                  </span>
                  {isActive && (
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#221F1F]/50 mt-0.5">
                      {phase}
                    </span>
                  )}
                </div>
              </div>

              {/* Reset & Cycle Indicator */}
              <div className="flex items-center gap-4 mt-4 min-h-[20px]">
                {completedCycles > 0 && (
                  <span className="text-xs text-[#221F1F]/60">
                    {completedCycles} siklus selesai
                  </span>
                )}
                {isActive && (
                  <button
                    onClick={resetExercise}
                    className="inline-flex items-center gap-1 text-xs text-[#221F1F]/50 hover:text-[#4A3E7D] transition cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Instruction and Controls */}
            <div className="md:col-span-7 flex flex-col justify-center text-left">
              <div className="mb-6">
                {isActive && (
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4A3E7D] font-geometric">
                    Fase: {phase}
                  </span>
                )}
                <h3 className="font-geometric text-xl sm:text-2xl font-bold text-[#221F1F] mt-1 mb-2">
                  {isActive ? currentInfo.title : 'Ambil Posisi Duduk yang Nyaman'}
                </h3>
                <p className="text-sm text-[#221F1F]/75 leading-[1.6]">
                  {isActive
                    ? currentInfo.desc
                    : 'Sandarkan punggungmu dengan santai, rilekskan bahu, dan letakkan telapak tangan di atas paha. Klik tombol di bawah saat kamu siap memulai.'}
                </p>
              </div>

              {/* Three Steps Legend */}
              <div className="grid grid-cols-3 gap-2.5 py-3 mb-6 border-y border-[#4A3E7D]/10">
                <div className={`p-2.5 rounded-xl transition-all ${isActive && phase === 'Inhale' ? 'bg-[#4A3E7D]/15 font-bold' : 'bg-white/80'}`}>
                  <span className="block text-xs text-[#4A3E7D] font-bold">1. Tarik</span>
                  <span className="text-[11px] text-[#221F1F]/70">4 Detik</span>
                </div>
                <div className={`p-2.5 rounded-xl transition-all ${isActive && phase === 'Hold' ? 'bg-[#4A3E7D]/15 font-bold' : 'bg-white/80'}`}>
                  <span className="block text-xs text-[#4A3E7D] font-bold">2. Tahan</span>
                  <span className="text-[11px] text-[#221F1F]/70">7 Detik</span>
                </div>
                <div className={`p-2.5 rounded-xl transition-all ${isActive && phase === 'Exhale' ? 'bg-[#1E7E45]/15 font-bold' : 'bg-white/80'}`}>
                  <span className="block text-xs text-[#1E7E45] font-bold">3. Lepas</span>
                  <span className="text-[11px] text-[#221F1F]/70">8 Detik</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                <button
                  type="button"
                  onClick={toggleExercise}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ease-in-out cursor-pointer shadow-xs hover:shadow-md active:scale-95 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white text-[#221F1F] hover:bg-white/80 border border-[#4A3E7D]/10'
                      : 'bg-[#4A3E7D] text-white hover:bg-[#3D3268]'
                  }`}
                >
                  {isActive ? (
                    <>
                      <Pause className="w-4 h-4 shrink-0" />
                      <span className="whitespace-nowrap">Jeda Latihan</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 shrink-0" />
                      <span className="whitespace-nowrap">Mulai Napas 4-7-8</span>
                    </>
                  )}
                </button>

                {onGoToCurhat && (
                  <button
                    type="button"
                    onClick={onGoToCurhat}
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold text-[#4A3E7D] hover:bg-[#4A3E7D]/8 transition cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span className="whitespace-nowrap">Masih terasa cemas? Curhat di sini</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
