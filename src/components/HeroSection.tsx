import React from 'react';
import { ArrowDown, Shield, HeartHandshake, BookOpen } from 'lucide-react';
import { BreathingExercise } from './BreathingExercise';

interface HeroSectionProps {
  onStartScreening: () => void;
  onExploreLiteracy: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartScreening,
  onExploreLiteracy
}) => {
  return (
    <section
      id="hero-section"
      className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-[#FAF8F6]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Headline & Direct Actions */}
          <div className="lg:col-span-7 text-left">
            {/* Headline Utama with Warm Editorial Typography */}
            <h1
              id="hero-headline"
              className="font-serif text-3xl sm:text-5xl lg:text-5.5xl font-bold text-[#221F1F] tracking-tight leading-[1.18] sm:leading-[1.14] mb-6"
            >
              AKASA: Ruang Aman untuk Kenali & Kelola{' '}
              <span className="text-[#6851A4] italic underline decoration-[#6851A4]/30 underline-offset-8">
                Stres Akademikmu
              </span>
            </h1>

            {/* Sub-Headline (Strictly Preserved) */}
            <p
              id="hero-subheadline"
              className="text-base sm:text-lg text-[#221F1F]/75 max-w-xl font-normal leading-relaxed mb-8"
            >
              Media belajar sekaligus asisten AI privat yang terbuka untuk membantu siswa SMA mengenali emosi dan menemukan langkah penanganan yang tepat bagi dirinya.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                id="hero-cta-screening-btn"
                onClick={onStartScreening}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#6851A4] text-white text-base font-bold shadow-sm hover:bg-[#574193] hover:shadow-md active:scale-98 transition-all cursor-pointer group"
              >
                <span>Mulai Cerita & Skrining</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                id="hero-secondary-btn"
                onClick={onExploreLiteracy}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#221F1F]/85 text-base font-bold border border-[#221F1F]/12 hover:bg-[#FAF8F6] hover:border-[#221F1F]/25 active:scale-98 transition-all cursor-pointer shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-[#6851A4]" />
                <span>Pelajari 5 Respon Emosi</span>
              </button>
            </div>

            {/* Humanized Reassurance Note */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#221F1F]/65 pt-4 border-t border-[#221F1F]/8">
              <span className="flex items-center gap-1.5 font-semibold text-[#221F1F]/85">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Kerahasiaan Terjamin
              </span>
              <span className="text-[#221F1F]/30">•</span>
              <span>Tanpa Akun & Tanpa Penilaian</span>
              <span className="text-[#221F1F]/30">•</span>
              <span>100% Gratis untuk Pelajar</span>
            </div>
          </div>

          {/* Right Column: Intimate Diary Card + Breathing Sanctuary */}
          <div className="lg:col-span-5 space-y-4 text-left">
            {/* Note from Student Desk */}
            <div className="p-6 rounded-2xl bg-white border border-[#221F1F]/8 shadow-warm-card relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-[#221F1F]/6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#6851A4]"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#221F1F]/60">
                    Catatan dari Meja Belajar
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#221F1F]/50">
                  SMA Unggul Del
                </span>
              </div>

              <blockquote className="font-serif italic text-[#221F1F]/85 text-sm sm:text-base leading-relaxed mb-4">
                &ldquo;Terkadang kita bukan malas belajar, tapi baterai emosi kita yang sudah habis karena tuntutan tugas dan ujian yang tiada henti. Di AKASA, kamu boleh berhenti sejenak tanpa rasa bersalah.&rdquo;
              </blockquote>

              <div className="flex items-center justify-between text-xs text-[#221F1F]/70 pt-2">
                <span className="font-semibold text-[#221F1F]">Viona Glory Hutabarat</span>
                <span className="text-[#6851A4] font-medium">Inisiator AKASA</span>
              </div>
            </div>

            {/* Interactive Breathing Exercise */}
            <BreathingExercise />
          </div>
        </div>
      </div>
    </section>
  );
};
