import React, { useState, useEffect } from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { HeroInteractiveVisual } from './HeroInteractiveVisual';
import { HeroQuickToolsCard } from './HeroQuickToolsCard';

interface HeroSectionProps {
  onStartScreening: () => void;
  onExploreLiteracy: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartScreening,
  onExploreLiteracy,
}) => {
  const line2Prefix = 'Kenali & Kelola ';
  const [typedLine2, setTypedLine2] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  // Smooth, silent typewriter text animation for line 2 of headline (~500ms)
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 2;
      if (index <= line2Prefix.length) {
        setTypedLine2(line2Prefix.slice(0, index));
      } else {
        setTypedLine2(line2Prefix);
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative py-16 md:py-24 overflow-hidden bg-[#FAF8F5]"
    >
      {/* 4. AMBIENT BACKGROUND GLOW (Cahaya Latar Organik di z-index: 0 & overflow: hidden) */}
      <div
        className="absolute -top-16 -left-16 w-[450px] h-[450px] rounded-full bg-[#E8E2F7] opacity-30 pointer-events-none z-0"
        style={{ filter: 'blur(120px)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -right-16 w-[400px] h-[400px] rounded-full bg-[#E0F2E9] opacity-20 pointer-events-none z-0"
        style={{ filter: 'blur(100px)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* 1. SECTION ATAS: Centered Header (Rata Tengah) */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          {/* Kicker label */}
          <p className="text-xs sm:text-sm font-bold tracking-widest text-[#4A3E7D] uppercase mb-3.5 font-geometric">
            Psikoedukasi & Ruang Refleksi Remaja
          </p>

          {/* Headline Utama: Geometric Sans-Serif, Max 2 Baris, Tanpa Italic, Rata Tengah */}
          <h1
            id="hero-headline"
            className="font-geometric text-3.5xl sm:text-4.5xl lg:text-[48px] xl:text-[52px] font-black text-[#221F1F] tracking-tight leading-[1.18] sm:leading-[1.2] mb-5 not-italic"
          >
            <span className="block">AKASA: Ruang Aman untuk</span>
            <span className="block mt-1">
              <span>{typedLine2}</span>
              {!isTypingDone && (
                <span className="inline-block w-1.5 h-8 sm:h-10 bg-[#4A3E7D] ml-1.5 animate-pulse align-middle" />
              )}
              {isTypingDone && (
                <span className="text-[#4A3E7D] not-italic font-black inline-block">
                  Stres Akademikmu
                </span>
              )}
            </span>
          </h1>

          {/* Sub-Headline Deskripsi Singkat: Line-Height 1.6 untuk Kenyamanan Membaca */}
          <p
            id="hero-subheadline"
            className="text-base sm:text-lg text-[#221F1F]/75 max-w-2xl mx-auto font-normal leading-[1.6] mb-8 font-sans"
          >
            Media pembelajaran sekaligus asisten AI pribadi yang siap membantu siswa SMA mengenali emosi dan menemukan langkah penanganan yang sesuai untuk dirinya.
          </p>

          {/* 3 Badges Horizontal Rata Tengah dengan Palet Hangat & Organik */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E2F1E8] text-[#1E7E45] border border-[#1E7E45]/20 text-xs font-semibold shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E7E45] stroke-[2.2]" />
              <span>Kerahasiaan Terjaga</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8E2F7]/70 text-[#4A3E7D] border border-[#4A3E7D]/20 text-xs font-semibold shadow-2xs">
              <Check className="w-3.5 h-3.5 text-[#4A3E7D] stroke-[2.5]" />
              <span>Tanpa Registrasi</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8E2F7]/70 text-[#4A3E7D] border border-[#4A3E7D]/20 text-xs font-semibold shadow-2xs">
              <Check className="w-3.5 h-3.5 text-[#4A3E7D] stroke-[2.5]" />
              <span>Khusus Pelajar SMA</span>
            </span>
          </div>
        </div>

        {/* 2. SECTION BAWAH: 2-Column Dashboard yang Simetris & Equal Height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* KOLOM KIRI: Widget Psikoedukasi Spotlight */}
          <div className="h-full">
            <HeroQuickToolsCard onExploreLiteracy={onExploreLiteracy} />
          </div>

          {/* KOLOM KANAN: Preview Chat AI */}
          <div className="h-full">
            <HeroInteractiveVisual onStartScreening={onStartScreening} />
          </div>

        </div>

      </div>
    </section>
  );
};
