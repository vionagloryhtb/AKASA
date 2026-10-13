import React, { useState } from 'react';
import { Smile, ArrowRight } from 'lucide-react';

interface HeroInteractiveVisualProps {
  onStartScreening: () => void;
}

export const HeroInteractiveVisual: React.FC<HeroInteractiveVisualProps> = ({
  onStartScreening,
}) => {
  const [activeMoodIndex, setActiveMoodIndex] = useState(0);

  const moodExamples = [
    {
      id: 'tugas',
      label: 'Tugas Numpuk',
      studentQuery: 'PR matematika 3 bab belum selesai, padahal besok pagi dikumpul. Mau nangis rasanya...',
      aiResponse: 'Tarik napas dulu ya. Nggak apa-apa merasa kewalahan. Otakmu lagi overload, bukan berarti kamu bodoh. Yuk kita pilah yang paling darurat dulu tanpa panik.',
      reflectionTag: 'Pilah Beban Belajar'
    },
    {
      id: 'cemas',
      label: 'Cemas Nilai Ujian',
      studentQuery: 'Takut banget nilaiku anjlok dan bikin orang tua kecewa...',
      aiResponse: 'Rasa cemas itu bukti kamu peduli. Tapi ingat ya, nilai selembar kertas nggak pernah menentukan berharganya dirimu. Mau kita urai rasa takutnya pelan-pelan?',
      reflectionTag: 'Validasi Rasa Takut'
    },
    {
      id: 'lelah',
      label: 'Baterai Habis',
      studentQuery: 'Udah nggak sanggup buka buku lagi, kepala berat banget...',
      aiResponse: 'Kalau baterai fisikmu drop, memaksakan belajar justru bikin stres makin tinggi. Boleh banget kamu tidur lebih awal malam ini tanpa rasa bersalah sama sekali.',
      reflectionTag: 'Izin Istirahat'
    }
  ];

  const currentExample = moodExamples[activeMoodIndex];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none h-full group">
      {/* Main Container: Matching Soft Lavender Tint, Equal Height, 0.3s Micro-Interaction Hover */}
      <div className="relative bg-[#F0EEF8]/90 backdrop-blur-md rounded-3xl border border-[#4A3E7D]/12 p-6 sm:p-8 md:p-9 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-soft-float h-full flex flex-col justify-between text-left">
        
        {/* Mockup Header: Stylized High School Student Safe Space */}
        <div className="flex items-center justify-between pb-5 mb-2 border-b border-[#4A3E7D]/10 gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-[#4A3E7D] flex items-center justify-center text-white shadow-xs">
                <Smile className="w-6 h-6 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#1E7E45] border-2 border-[#F0EEF8]" />
            </div>

            <h3 className="font-geometric text-base sm:text-lg font-bold text-[#221F1F]">
              Teman Refleksi AKASA
            </h3>
          </div>

          <div className="shrink-0 text-right">
            <span className="inline-block text-[11px] font-mono bg-[#E2F1E8] text-[#1E7E45] border border-[#1E7E45]/20 px-3 py-1 rounded-full font-bold shadow-2xs">
              Live Preview
            </span>
          </div>
        </div>

        {/* Interactive Mood Scenario Switcher */}
        <div className="my-2 text-left">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#4A3E7D]/70 mb-2">
            Klik situasi yang paling menggambarkan harimu:
          </p>
          <div className="flex flex-wrap gap-2">
            {moodExamples.map((item, idx) => {
              const isSelected = activeMoodIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveMoodIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ease-in-out cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-[#4A3E7D] text-white shadow-xs -translate-y-0.5'
                      : 'bg-white/70 text-[#221F1F]/75 hover:bg-[#4A3E7D]/10 hover:text-[#4A3E7D]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mockup Chat Body: Student Question & Empathetic AI Response */}
        <div className="space-y-4 my-3 text-left flex-grow flex flex-col justify-center">
          {/* Student Bubble */}
          <div className="flex justify-end">
            <div className="max-w-[85%] bg-[#4A3E7D]/10 text-[#221F1F] rounded-2xl rounded-tr-xs px-4 py-3 text-xs sm:text-sm font-medium leading-[1.6]">
              <span className="block text-[10px] font-bold text-[#4A3E7D] mb-0.5">Siswa SMA:</span>
              &ldquo;{currentExample.studentQuery}&rdquo;
            </div>
          </div>

          {/* AKASA Empathetic AI Bubble */}
          <div className="flex justify-start items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4A3E7D] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-geometric font-bold shadow-2xs">
              A
            </div>
            <div className="max-w-[88%] bg-white/90 border border-[#4A3E7D]/10 rounded-2xl rounded-tl-xs p-4 text-xs sm:text-sm text-[#221F1F]/85 leading-[1.6] shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A3E7D]">
                  AKASA AI Pendamping
                </span>
                <span className="text-[10px] text-[#1E7E45] font-semibold bg-[#E2F1E8] px-2 py-0.5 rounded-md">
                  {currentExample.reflectionTag}
                </span>
              </div>
              <p className="font-normal text-[#221F1F]/90 leading-[1.6]">
                {currentExample.aiResponse}
              </p>
            </div>
          </div>
        </div>

        {/* Direct Action Link */}
        <div className="pt-4 border-t border-[#4A3E7D]/10 flex items-center justify-end">
          <button
            type="button"
            onClick={onStartScreening}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4A3E7D] text-white text-xs sm:text-sm font-bold hover:bg-[#3D3268] transition-all duration-300 ease-in-out cursor-pointer shadow-xs hover:shadow-md active:scale-95 group"
          >
            <span>Coba Curhat Sekarang</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Floating Note Badge */}
      <div className="hidden sm:flex items-center gap-2.5 absolute -bottom-3.5 -left-3.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#4A3E7D]/12 shadow-soft-float">
        <div className="w-2 h-2 rounded-full bg-[#1E7E45] animate-ping" />
        <p className="text-xs font-medium text-[#221F1F]/80">
          Tempat aman menenangkan pikiran sebelum mulai belajar lagi
        </p>
      </div>
    </div>
  );
};
