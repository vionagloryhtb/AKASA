import React, { useState } from 'react';
import { AkasaLogo } from './AkasaLogo';
import { Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'literasi-emosi', label: 'Literasi Emosi' },
    { id: 'skrining-ai', label: 'Skrining AI' },
    { id: 'filosofi-akasa', label: 'Filosofi AKASA' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-50 bg-[#FAF8F6]/92 backdrop-blur-md border-b border-[#221F1F]/6 transition-all"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <button
            id="nav-brand-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer group focus:outline-none"
            aria-label="Kembali ke atas"
          >
            <AkasaLogo size="sm" />
          </button>
        </div>

        {/* Center: Navigation Menu (Desktop) */}
        <nav id="nav-center-menu" className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'text-[#6851A4] bg-[#6851A4]/12 font-bold'
                    : 'text-[#221F1F]/70 hover:text-[#221F1F] hover:bg-[#221F1F]/4'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#221F1F] hover:bg-black/5 transition cursor-pointer"
            aria-label="Buka navigasi"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-dropdown"
          className="md:hidden border-b border-[#221F1F]/8 bg-[#FFFFFF] px-4 py-4 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left px-4 py-2.5 text-base font-semibold rounded-xl text-[#221F1F]/85 hover:text-[#6851A4] hover:bg-[#FAF8F6] transition"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 mt-1 border-t border-[#221F1F]/6 flex items-center justify-between px-2 text-xs text-[#221F1F]/70">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Ruang Privat 100%
              </span>
              <span className="text-[#221F1F]/60">AKASA</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
