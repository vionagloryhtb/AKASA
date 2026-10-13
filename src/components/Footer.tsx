import React from 'react';
import { ActivePage } from '../types';

interface FooterProps {
  onSelectPage?: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer
      id="main-footer"
      className="bg-[#FAF8F5] border-t border-[#4A3E7D]/10 py-8"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p id="footer-text" className="text-xs sm:text-sm font-medium text-[#221F1F]/80">
          AKASA © 2026 SMA Unggul Del
        </p>
      </div>
    </footer>
  );
};
