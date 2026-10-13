import React, { useEffect, useState } from 'react';
import { AkasaLogo } from './AkasaLogo';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Show splash for 1.4 seconds, then fade out smoothly for 350ms
    const timer = setTimeout(() => {
      setFadingOut(true);
      const finishTimer = setTimeout(() => {
        onFinish();
      }, 350);
      return () => clearTimeout(finishTimer);
    }, 1400);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      id="akasa-splash-screen"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF8F5] px-6 transition-all duration-400 ease-out ${
        fadingOut ? 'opacity-0 scale-102 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-hidden="true"
    >
      {/* Decorative ambient aura */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#4A3E7D]/6 blur-3xl pointer-events-none animate-pulse duration-1000" />

      <div className="relative flex flex-col items-center text-center max-w-md mx-auto">
        {/* Animated Logo Container */}
        <div className="mb-4 transform transition-all duration-500 ease-out animate-in fade-in zoom-in-90">
          <div className="p-4 sm:p-5 rounded-3xl bg-white shadow-warm-card border border-[#4A3E7D]/10">
            <AkasaLogo size="lg" showText={false} />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="font-geometric text-3xl sm:text-4xl font-extrabold text-[#221F1F] tracking-wider mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          AKASA
        </h1>

        {/* Loading subtle indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4A3E7D] animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 rounded-full bg-[#4A3E7D] animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 rounded-full bg-[#4A3E7D] animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};
