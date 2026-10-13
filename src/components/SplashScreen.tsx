import React, { useEffect, useState } from 'react';
import { AkasaLogo } from './AkasaLogo';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fadingOut, setFadingOut] = useState(false);
  const fullQuote = 'Ruang aman dan tenang untuk kenali serta urai emosi belajarmu.';
  const [typedQuote, setTypedQuote] = useState('');

  // Typing animation for philosophy quote (fast & crisp: ~900ms)
  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx <= fullQuote.length) {
        setTypedQuote(fullQuote.slice(0, currentIdx));
        currentIdx += 2;
      } else {
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Show splash for 1.8 seconds, then fade out smoothly for 350ms
    const timer = setTimeout(() => {
      setFadingOut(true);
      const finishTimer = setTimeout(() => {
        onFinish();
      }, 350);
      return () => clearTimeout(finishTimer);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      id="akasa-splash-screen"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF8F6] px-6 transition-all duration-400 ease-out ${
        fadingOut ? 'opacity-0 scale-102 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-hidden="true"
    >
      {/* Decorative ambient aura */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#6851A4]/6 blur-3xl pointer-events-none animate-pulse duration-1000" />

      <div className="relative flex flex-col items-center text-center max-w-md mx-auto">
        {/* Animated Logo Container */}
        <div className="mb-5 transform transition-all duration-500 ease-out animate-in fade-in zoom-in-90">
          <div className="p-4 sm:p-5 rounded-3xl bg-white shadow-warm-card border border-[#221F1F]/6">
            <AkasaLogo size="lg" showText={false} />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#221F1F] tracking-wider mb-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
          AKASA
        </h1>

        {/* Typing Philosophy Quote */}
        <div className="min-h-[48px] flex items-center justify-center mb-5 px-2">
          <p className="font-serif italic text-sm sm:text-base text-[#221F1F]/80 leading-relaxed max-w-xs sm:max-w-sm">
            &ldquo;{typedQuote}&rdquo;
            {typedQuote.length < fullQuote.length && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-[#6851A4] animate-pulse align-middle" />
            )}
          </p>
        </div>

        {/* Loading subtle indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#6851A4] animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 rounded-full bg-[#6851A4] animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 rounded-full bg-[#6851A4] animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};
