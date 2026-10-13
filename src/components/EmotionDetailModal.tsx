import React, { useState } from 'react';
import { EmotionInfo } from '../types';
import { X, Activity, Brain, ShieldAlert, HeartHandshake, CheckCircle2, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

interface EmotionDetailModalProps {
  emotion: EmotionInfo | null;
  isOpen: boolean;
  onClose: () => void;
  onCurhatClick: (emotionId: EmotionInfo['id']) => void;
}

export const EmotionDetailModal: React.FC<EmotionDetailModalProps> = ({
  emotion,
  isOpen,
  onClose,
  onCurhatClick
}) => {
  const [activeTab, setActiveTab] = useState<'signals' | 'brain' | 'coping' | 'cta'>('signals');

  if (!isOpen || !emotion) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-[#221F1F]/10 flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className="p-5 sm:p-6 border-b border-[#221F1F]/8 flex items-start justify-between relative transition-colors"
          style={{ backgroundColor: emotion.accentColor.bgSoft }}
        >
          <div className="pr-8">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full border shadow-2xs"
                style={{
                  backgroundColor: emotion.accentColor.badgeBg,
                  color: emotion.accentColor.badgeText,
                  borderColor: emotion.accentColor.border
                }}
              >
                {emotion.badgeLabel}
              </span>
              <span className="text-xs text-[#221F1F]/60 font-medium">
                {emotion.indonesianTitle}
              </span>
            </div>
            <h3 className="font-geometric text-2xl sm:text-3xl font-extrabold text-[#221F1F]">
              {emotion.label}
            </h3>
            <p className="text-xs sm:text-sm text-[#221F1F]/75 mt-1 leading-[1.6]">
              {emotion.definition}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-[#221F1F]/70 hover:text-[#221F1F] border border-[#221F1F]/10 transition cursor-pointer shadow-xs"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Tabs Navigation */}
        <div className="flex border-b border-[#221F1F]/8 bg-[#FAF8F5] px-3 sm:px-6 overflow-x-auto gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('signals')}
            className={`flex items-center gap-1.5 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'signals'
                ? 'border-[#4A3E7D] text-[#4A3E7D]'
                : 'border-transparent text-[#221F1F]/65 hover:text-[#221F1F]'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>1. Sinyal Tubuh & Pikiran</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('brain')}
            className={`flex items-center gap-1.5 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'brain'
                ? 'border-[#4A3E7D] text-[#4A3E7D]'
                : 'border-transparent text-[#221F1F]/65 hover:text-[#221F1F]'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>2. Sains & Otak</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('coping')}
            className={`flex items-center gap-1.5 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'coping'
                ? 'border-[#4A3E7D] text-[#4A3E7D]'
                : 'border-transparent text-[#221F1F]/65 hover:text-[#221F1F]'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>3. Langkah Coping</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cta')}
            className={`flex items-center gap-1.5 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'cta'
                ? 'border-[#4A3E7D] text-[#4A3E7D]'
                : 'border-transparent text-[#221F1F]/65 hover:text-[#221F1F]'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>4. Solusi AI</span>
          </button>
        </div>

        {/* Tab Contents (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-grow space-y-4">
          {/* TAB 1: Sinyal Tubuh & Pikiran */}
          {activeTab === 'signals' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6851A4] mb-2 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Sinyal Fisik yang Muncul di Sekolah:</span>
                </h4>
                <div className="space-y-2">
                  {emotion.physicalSigns.map((sig, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#FAF8F6] border border-[#221F1F]/6 text-xs sm:text-sm text-[#221F1F]/85 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        !
                      </span>
                      <span className="leading-relaxed">{sig}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6851A4] mb-2 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5" />
                  <span>Sinyal Psikologis & Pola Pikir:</span>
                </h4>
                <div className="space-y-2">
                  {emotion.psychologicalSigns.map((psi, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#FAF8F6] border border-[#221F1F]/6 text-xs sm:text-sm text-[#221F1F]/85 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        •
                      </span>
                      <span className="leading-relaxed">{psi}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Sains & Otak */}
          {activeTab === 'brain' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div
                className="p-4 rounded-2xl border"
                style={{
                  backgroundColor: emotion.accentColor.bgSoft,
                  borderColor: emotion.accentColor.border
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Brain className="w-5 h-5" style={{ color: emotion.accentColor.primary }} />
                  <span className="text-xs font-mono font-bold uppercase" style={{ color: emotion.accentColor.primary }}>
                    Konsep Neurobiologis: {emotion.brainScience.neuroConcept}
                  </span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#221F1F] mb-2">
                  {emotion.brainScience.headline}
                </h4>
                <p className="text-xs sm:text-sm text-[#221F1F]/85 leading-relaxed">
                  {emotion.brainScience.explanation}
                </p>
              </div>

              {/* Kuis Mandiri Reflektif */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-1">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>Kuis Cepat untuk Dirimu:</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#221F1F] mb-2 italic">
                  &ldquo;{emotion.quickQuiz.question}&rdquo;
                </p>
                <div className="text-xs text-amber-900 bg-white/80 p-2.5 rounded-lg border border-amber-100 font-normal">
                  <strong>Insight sains:</strong> {emotion.quickQuiz.insight}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Langkah Coping */}
          {activeTab === 'coping' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <p className="text-xs text-[#221F1F]/70">
                Rekomendasi teknik pertolongan pertama yang bisa langsung kamu praktekkan saat ini juga:
              </p>
              <div className="space-y-3">
                {emotion.copingSteps.map((cop, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#FAF8F6] border border-[#221F1F]/8 hover:border-[#6851A4]/30 transition"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold text-[#6851A4] px-2.5 py-0.5 rounded-md bg-white border border-[#6851A4]/15">
                        Teknik {idx + 1}: {cop.techniqueName}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h5 className="text-sm font-bold text-[#221F1F] mb-1">
                      {cop.step}
                    </h5>
                    <p className="text-xs text-[#221F1F]/75 leading-relaxed">
                      {cop.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CTA Curhat ke AI AKASA */}
          {activeTab === 'cta' && (
            <div className="space-y-4 animate-in fade-in duration-200 text-center py-4">
              <div
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-xs"
                style={{
                  backgroundColor: emotion.accentColor.badgeBg,
                  color: emotion.accentColor.primary
                }}
              >
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="max-w-md mx-auto">
                <h4 className="font-geometric text-xl sm:text-2xl font-bold text-[#221F1F] mb-2">
                  Sedang Menghadapi {emotion.label}?
                </h4>
                <p className="text-xs sm:text-sm text-[#221F1F]/75 leading-[1.6] mb-6">
                  Jangan biarkan beban pikiranmu mengendap sendiri. Bawa emosi ini ke Ruang Curhat untuk mendapatkan tanggapan hangat, validasi tanpa penghakiman, dan 1 pertanyaan panduan refleksi dari AI AKASA.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onCurhatClick(emotion.id);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
                  style={{ backgroundColor: emotion.accentColor.primary }}
                >
                  <span>Curhatkan Masalah Ini ke AI AKASA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#221F1F]/8 bg-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#221F1F]/60 text-center sm:text-left">
            Edukasi emosi berbasis sains perilaku remaja SMA.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white text-xs font-semibold text-[#221F1F]/75 border border-[#221F1F]/10 hover:bg-[#FAF8F5] transition-all duration-300 cursor-pointer"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onCurhatClick(emotion.id);
              }}
              className="px-5 py-2 rounded-xl bg-[#4A3E7D] text-white text-xs font-bold hover:bg-[#3D3268] transition-all duration-300 cursor-pointer shadow-xs inline-flex items-center gap-1.5"
            >
              <span>Curhatkan Ini</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
