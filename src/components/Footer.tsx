import React from 'react';
import { AkasaLogo } from './AkasaLogo';
import { ActivePage } from '../types';

interface FooterProps {
  onSelectPage?: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPage }) => {
  return (
    <footer
      id="main-footer"
      className="bg-[#FAF8F5] border-t border-[#4A3E7D]/10 py-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#4A3E7D]/10">
          {/* Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <AkasaLogo size="sm" />
            <span className="hidden sm:inline text-[#221F1F]/30">•</span>
            <p className="text-xs sm:text-sm text-[#221F1F]/70">
              Ruang Aman Psikoedukasi & Kesehatan Mental Pelajar SMA
            </p>
          </div>

          {/* Quick links with micro-interactions */}
          {onSelectPage && (
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <button
                type="button"
                onClick={() => { onSelectPage('edukasi'); }}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white border border-[#4A3E7D]/15 text-[#221F1F]/80 hover:text-[#4A3E7D] hover:border-[#4A3E7D]/35 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer shadow-xs"
              >
                Edukasi & Belajar
              </button>
              <button
                type="button"
                onClick={() => { onSelectPage('curhat'); }}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white border border-[#4A3E7D]/15 text-[#221F1F]/80 hover:text-[#4A3E7D] hover:border-[#4A3E7D]/35 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer shadow-xs"
              >
                Ruang Curhat
              </button>
              <button
                type="button"
                onClick={() => { onSelectPage('filosofi'); }}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white border border-[#4A3E7D]/15 text-[#221F1F]/80 hover:text-[#4A3E7D] hover:border-[#4A3E7D]/35 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer shadow-xs"
              >
                Filosofi AKASA
              </button>
            </div>
          )}
        </div>

        {/* Official Credentials Row without em-dash */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#221F1F]/80">
          <p id="footer-text-left" className="font-medium text-center sm:text-left">
            AKASA © 2026 : Developed & Designed by{' '}
            <strong className="font-bold text-[#221F1F]">Viona Glory Hutabarat</strong>
          </p>
          <p id="footer-text-right" className="font-semibold text-[#4A3E7D] text-center sm:text-right">
            SMA Unggul Del
          </p>
        </div>

        {/* Full Single-Line Credential Statement without em-dash */}
        <div className="mt-4 pt-3 border-t border-[#4A3E7D]/8 text-center">
          <p id="footer-official-credential" className="text-xs text-[#221F1F]/60 font-medium">
            AKASA © 2026 : Developed & Designed by Viona Glory Hutabarat (SMA Unggul Del)
          </p>
        </div>
      </div>
    </footer>
  );
};
