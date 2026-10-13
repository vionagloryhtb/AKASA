import React, { useState } from 'react';
import { AkasaLogo } from './AkasaLogo';
import { Menu, X, BookOpen, MessageCircle, HeartHandshake } from 'lucide-react';
import { ActivePage } from '../types';

interface NavbarProps {
  currentPage: ActivePage;
  onSelectPage: (page: ActivePage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onSelectPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActivePage; label: string; subLabel: string; icon: React.ElementType }[] = [
    { id: 'edukasi', label: 'Edukasi & Belajar', subLabel: 'Psikoedukasi & Tips Stres', icon: BookOpen },
    { id: 'curhat', label: 'Ruang Curhat', subLabel: 'Refleksi Emosi & Teman AI', icon: MessageCircle },
    { id: 'filosofi', label: 'Filosofi AKASA', subLabel: 'First-Line Support & Visi', icon: HeartHandshake }
  ];

  const handleNavClick = (id: ActivePage) => {
    onSelectPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#4A3E7D]/10 transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <button
            id="nav-brand-btn"
            onClick={() => handleNavClick('edukasi')}
            className="flex items-center gap-2 cursor-pointer group focus:outline-none"
            aria-label="Kembali ke Beranda AKASA"
          >
            <AkasaLogo size="sm" />
          </button>
        </div>

        {/* Center/Right: Single Unified Navigation Header (Desktop) */}
        <nav id="nav-center-menu" className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const IconComp = item.icon;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out cursor-pointer active:scale-95 hover:-translate-y-0.5 ${
                  isActive
                    ? 'text-white bg-[#4A3E7D] font-bold shadow-xs ring-2 ring-[#4A3E7D]/20'
                    : 'text-[#221F1F]/70 hover:text-[#4A3E7D] hover:bg-[#4A3E7D]/8'
                }`}
              >
                <IconComp className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-[#4A3E7D]'}`} />
                <span>{item.label}</span>
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
          className="md:hidden border-b border-[#4A3E7D]/10 bg-[#FAF8F5] px-4 py-4 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#4A3E7D] px-2 mb-1">
              Menu Layanan AKASA:
            </p>
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold rounded-xl flex items-center justify-between transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#4A3E7D] text-white shadow-xs'
                      : 'text-[#221F1F]/85 hover:text-[#4A3E7D] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#4A3E7D]'}`} />
                    <div>
                      <p className="font-bold">{item.label}</p>
                      <p className={`text-xs ${isActive ? 'text-white/80' : 'text-[#221F1F]/50'}`}>
                        {item.subLabel}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
