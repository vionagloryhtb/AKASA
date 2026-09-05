import React from 'react';
import { AkasaLogo } from './AkasaLogo';

export const Footer: React.FC = () => {
  return (
    <footer
      id="main-footer"
      className="bg-[#FAF8F6] border-t border-[#221F1F]/8 py-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#221F1F]/6">
          {/* Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <AkasaLogo size="sm" />
            <span className="hidden sm:inline text-[#221F1F]/30">•</span>
            <p className="text-xs sm:text-sm text-[#221F1F]/70">
              Ruang Aman Psikoedukasi & Kesehatan Mental Pelajar SMA
            </p>
          </div>

          {/* Quick links & pill */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-[#221F1F]/8 text-[#221F1F]/80">
              Ruang Tenang untuk Siswa SMA
            </span>
          </div>
        </div>

        {/* Official Credentials Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#221F1F]/80">
          <p id="footer-text-left" className="font-medium text-center sm:text-left">
            AKASA © 2026 — Developed & Designed by{' '}
            <strong className="font-bold text-[#221F1F]">Viona Glory Hutabarat</strong>
          </p>
          <p id="footer-text-right" className="font-semibold text-[#6851A4] text-center sm:text-right">
            SMA Unggul Del
          </p>
        </div>

        {/* Full Single-Line Credential Statement as specified */}
        <div className="mt-4 pt-3 border-t border-[#221F1F]/5 text-center">
          <p id="footer-official-credential" className="text-xs text-[#221F1F]/60 font-medium">
            AKASA © 2026 — Developed & Designed by Viona Glory Hutabarat (SMA Unggul Del)
          </p>
        </div>
      </div>
    </footer>
  );
};
