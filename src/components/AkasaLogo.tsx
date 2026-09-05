import React from 'react';

interface AkasaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const AkasaLogo: React.FC<AkasaLogoProps> = ({
  className = '',
  size = 'md',
  showText = true
}) => {
  const iconSizes = {
    sm: { w: 32, h: 26, textClass: 'text-xl tracking-wider' },
    md: { w: 42, h: 34, textClass: 'text-2xl tracking-wider' },
    lg: { w: 56, h: 46, textClass: 'text-3xl tracking-wider' }
  };

  const current = iconSizes[size];

  return (
    <div id="akasa-brand-logo" className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon matching the emblem from gemini-svg.svg */}
      <svg
        width={current.w}
        height={current.h}
        viewBox="0 0 120 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Logo AKASA"
      >
        {/* Top cyan circle */}
        <circle cx="60" cy="18" r="9" fill="#00C0F0" />

        {/* Upper soft lilac/lavender canopy arch */}
        <path
          d="M18 64 C20 34, 42 22, 60 22 C78 22, 100 34, 102 64 C94 56, 78 50, 60 50 C42 50, 26 56, 18 64 Z"
          fill="#ECE8FE"
        />

        {/* Lower rich violet/purple arch */}
        <path
          d="M22 65 C28 54, 44 48, 60 48 C76 48, 92 54, 98 65 C88 80, 74 84, 60 84 C46 84, 32 80, 22 65 Z"
          fill="#6851A4"
        />
      </svg>

      {showText && (
        <span
          className={`font-black text-[#221F1F] font-['Nunito','Quicksand',sans-serif] ${current.textClass} tracking-[0.08em]`}
        >
          AKASA
        </span>
      )}
    </div>
  );
};
