/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EmotionEducation } from './components/EmotionEducation';
import { BreathingSection } from './components/BreathingSection';
import { AkasaAI } from './components/AkasaAI';
import { PhilosophySection } from './components/PhilosophySection';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { EmotionType, ActivePage } from './types';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState<ActivePage>('edukasi');
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>('burnout');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelectEmotionFromCard = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
    handlePageChange('curhat');
  };

  const handlePageChange = (newPage: ActivePage) => {
    if (newPage === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <div id="akasa-app-root" className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#221F1F] font-['Plus_Jakarta_Sans','Nunito',sans-serif] selection:bg-[#4A3E7D]/15 selection:text-[#4A3E7D]">
      {/* 1. Splash / Welcome Screen Animation (1.5 - 2 detik) */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Single Header Navbar with interactive controls */}
      <Navbar
        currentPage={currentPage}
        onSelectPage={handlePageChange}
      />

      {/* Main Content Area with Smooth Page Transition Container */}
      <main className={`flex-grow transition-all duration-300 ease-out ${
        isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
      }`}>
        {/* Edukasi & Pembelajaran */}
        {currentPage === 'edukasi' && (
          <div key="page-edukasi" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Hero Section */}
            <HeroSection
              onStartScreening={() => handlePageChange('curhat')}
              onExploreLiteracy={() => {
                const el = document.getElementById('education-title');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Psikoedukasi, 5 Ragam Emosi, dan Manajemen Stres */}
            <EmotionEducation
              onSelectEmotionForScreening={handleSelectEmotionFromCard}
              onGoToCurhat={() => handlePageChange('curhat')}
            />

            {/* Dedicated Relaxing Breathing Section (4-7-8) */}
            <BreathingSection
              onGoToCurhat={() => handlePageChange('curhat')}
            />
          </div>
        )}

        {/* Ruang Curhat & Refleksi Emosi */}
        {currentPage === 'curhat' && (
          <div key="page-curhat" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <AkasaAI
              selectedEmotion={selectedEmotion}
              onSelectEmotion={setSelectedEmotion}
              onGoToEdukasi={() => handlePageChange('edukasi')}
            />
          </div>
        )}

        {/* Filosofi & Identitas AKASA */}
        {currentPage === 'filosofi' && (
          <div key="page-filosofi" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <PhilosophySection
              onGoToCurhat={() => handlePageChange('curhat')}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onSelectPage={handlePageChange} />
    </div>
  );
}
