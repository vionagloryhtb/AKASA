import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw } from 'lucide-react';

export const BreathingExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [countdown, setCountdown] = useState(4);

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
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'Inhale':
        return 'Tarik Napas Pelan...';
      case 'Hold':
        return 'Tahan Sebentar...';
      case 'Exhale':
        return 'Hembuskan Perlahan...';
    }
  };

  const getPhaseSubtext = () => {
    switch (phase) {
      case 'Inhale':
        return 'Rasakan udara dingin mengisi paru-parumu';
      case 'Hold':
        return 'Rasakan detak jantungmu mulai melambat';
      case 'Exhale':
        return 'Lepaskan semua beban di leher dan pundakmu';
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#221F1F]/8 shadow-warm-card text-left transition-all">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6851A4]">
            Jeda 1 Menit • Teknik Napas 4-7-8
          </span>
        </div>
        <button
          onClick={resetExercise}
          title="Reset latihan"
          className="text-[#221F1F]/40 hover:text-[#221F1F]/75 transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-5">
        {/* Animated circle */}
        <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full transition-all duration-1000 ${
              isActive
                ? phase === 'Inhale'
                  ? 'bg-[#6851A4]/20 scale-110'
                  : phase === 'Hold'
                  ? 'bg-[#6851A4]/30 scale-105'
                  : 'bg-[#00C0F0]/20 scale-95'
                : 'bg-[#6851A4]/8 scale-100'
            }`}
          />
          <div className="relative text-center">
            <span className="text-2xl font-serif font-bold text-[#6851A4]">
              {isActive ? countdown : '4s'}
            </span>
          </div>
        </div>

        <div className="flex-grow">
          <p className="font-serif text-base font-bold text-[#221F1F]">
            {isActive ? getPhaseText() : 'Butuh Napas Lega?'}
          </p>
          <p className="text-xs text-[#221F1F]/70 leading-relaxed mt-0.5">
            {isActive
              ? getPhaseSubtext()
              : 'Turunkan detak jantung dan rilekskan saraf saat kepalamu penuh dengan tugas.'}
          </p>

          <button
            onClick={toggleExercise}
            className={`mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              isActive
                ? 'bg-[#221F1F]/8 text-[#221F1F] hover:bg-[#221F1F]/15'
                : 'bg-[#6851A4] text-white hover:bg-[#574193] shadow-xs'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Jeda</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Mulai Latihan Napas</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
