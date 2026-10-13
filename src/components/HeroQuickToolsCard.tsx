import React from 'react';
import { BookOpen, Brain, HeartHandshake, Sparkles, ArrowRight, Check } from 'lucide-react';

interface HeroQuickToolsCardProps {
  onExploreLiteracy: () => void;
}

export const HeroQuickToolsCard: React.FC<HeroQuickToolsCardProps> = ({
  onExploreLiteracy,
}) => {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none h-full group">
      {/* Main Card Container: Soft Lavender Tint, Flat & Spacious, 0.3s Micro-Interaction Hover */}
      <div className="relative bg-[#F0EEF8]/90 backdrop-blur-md rounded-3xl border border-[#4A3E7D]/12 p-6 sm:p-8 md:p-9 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-soft-float h-full flex flex-col justify-between text-left">
        
        {/* 1. Header Kartu: Clean & Elegant */}
        <div className="flex items-start justify-between pb-5 mb-2 border-b border-[#4A3E7D]/10 gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-[#4A3E7D] flex items-center justify-center text-white shadow-xs">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#1E7E45] border-2 border-[#F0EEF8]" />
            </div>

            <div>
              <h3 className="font-geometric text-base font-bold text-[#221F1F]">
                Modul Edukasi Stres Akademik
              </h3>
              <p className="text-xs text-[#221F1F]/70 mt-1 leading-[1.6]">
                Pahami kenapa otak dan tubuhmu gampang capek saat belajar, serta cara mengatasinya secara ilmiah.
              </p>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <span className="inline-block text-[11px] font-mono bg-[#E8E2F7] text-[#4A3E7D] border border-[#4A3E7D]/20 px-3 py-1 rounded-full font-bold shadow-2xs">
              Psikoedukasi Spotlight
            </span>
          </div>
        </div>

        {/* 2. Visual Anchor Utama: 94,2% Data 2025 (Eliminasi Box-in-a-Box, Flat & Clean di atas kanvas) */}
        <div className="flex-grow flex flex-col justify-center my-3">
          
          {/* Data Statistik 2025: Teks & Angka langsung di atas kanvas kartu */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2.5">
              <span className="font-geometric text-5xl sm:text-6xl font-black text-[#4A3E7D] tracking-tight leading-none shrink-0">
                94,2%
              </span>
              <p className="font-geometric text-sm sm:text-base font-bold text-[#221F1F] leading-[1.4]">
                Pelajar SMA di DKI Jakarta Mengalami Stres Akademik (2025)
              </p>
            </div>
            <p className="text-xs sm:text-sm text-[#221F1F]/75 leading-[1.6]">
              Tingginya angka ini membuktikan bahwa rasa lelahmu adalah fenomena nyata, bukan sekadar rasa malas. Yuk, pahami sinyal biologis otakmu saat overload agar bisa dikelola secara ilmiah.
            </p>
          </div>

          {/* 3 Topik Pratinjau: Clean Borderless Rows */}
          <div className="space-y-3 mb-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#4A3E7D]/70 mb-1">
              Topik materi yang akan kamu pelajari:
            </p>

            <div className="flex items-center gap-3 py-1 transition-colors hover:text-[#4A3E7D]">
              <div className="w-7 h-7 rounded-full bg-[#4A3E7D]/10 text-[#4A3E7D] flex items-center justify-center shrink-0">
                <Brain className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#221F1F] leading-[1.6]">
                Mekanisme Otak & Hormon Stres saat Belajar
              </p>
            </div>

            <div className="flex items-center gap-3 py-1 transition-colors hover:text-[#4A3E7D]">
              <div className="w-7 h-7 rounded-full bg-[#4A3E7D]/10 text-[#4A3E7D] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#221F1F] leading-[1.6]">
                5 Jenis Emosi Utama Pelajar SMA
              </p>
            </div>

            <div className="flex items-center gap-3 py-1 transition-colors hover:text-[#4A3E7D]">
              <div className="w-7 h-7 rounded-full bg-[#4A3E7D]/10 text-[#4A3E7D] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#221F1F] leading-[1.6]">
                Panduan Latihan Relaksasi & Refleksi Mandiri
              </p>
            </div>
          </div>

        </div>

        {/* 3. Tombol Aksi (CTA Bawah) */}
        <div className="pt-4 border-t border-[#4A3E7D]/10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2F1E8] text-[#1E7E45] border border-[#1E7E45]/20 text-xs font-semibold">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Materi psikoedukasi ilmiah</span>
          </span>

          <button
            type="button"
            onClick={onExploreLiteracy}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4A3E7D] text-white text-xs sm:text-sm font-bold hover:bg-[#3D3268] transition-all duration-300 ease-in-out cursor-pointer shadow-xs hover:shadow-md active:scale-95 group"
          >
            <span>Buka Modul Edukasi Emosi</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </button>
        </div>

      </div>

      {/* Floating Note Badge */}
      <div className="hidden sm:flex items-center gap-2.5 absolute -bottom-3.5 -right-3.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#4A3E7D]/12 shadow-soft-float">
        <Sparkles className="w-3.5 h-3.5 text-[#4A3E7D]" />
        <p className="text-xs font-medium text-[#221F1F]/80">
          Dirancang ramah remaja dan berbasis riset ilmiah
        </p>
      </div>
    </div>
  );
};
