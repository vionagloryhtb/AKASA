/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EmotionEducation } from './components/EmotionEducation';
import { AkasaAI } from './components/AkasaAI';
import { PhilosophySection } from './components/PhilosophySection';
import { Footer } from './components/Footer';
import { EmotionType } from './types';

export default function App() {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>('burnout');
  const [activeNavSection, setActiveNavSection] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    setActiveNavSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectEmotionFromCard = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
    scrollToSection('skrining-ai');
  };

  return (
    <div id="akasa-app-root" className="min-h-screen flex flex-col bg-[#FAF8F6] text-[#221F1F] font-['Nunito','Quicksand',sans-serif]">
      {/* Navigation Bar */}
      <Navbar
        onNavigate={scrollToSection}
        activeSection={activeNavSection}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* ZONA 1: HERO SECTION */}
        <HeroSection
          onStartScreening={() => scrollToSection('skrining-ai')}
          onExploreLiteracy={() => scrollToSection('literasi-emosi')}
        />

        {/* ZONA 2: EDUKASI EMOSI INTERAKTIF */}
        <EmotionEducation
          onSelectEmotionForScreening={handleSelectEmotionFromCard}
        />

        {/* ZONA 3: ASISTEN CURHAT & SKRINING (Komponen Utama: AkasaAI) */}
        <AkasaAI
          selectedEmotion={selectedEmotion}
          onSelectEmotion={setSelectedEmotion}
        />

        {/* FILOSOFI AKASA SECTION */}
        <PhilosophySection />
      </main>

      {/* ZONA 4: FOOTER */}
      <Footer />
    </div>
  );
}
