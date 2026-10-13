export type EmotionType = 'burnout' | 'anxious' | 'overwhelmed' | 'exhausted' | 'demotivated';

export type ActivePage = 'edukasi' | 'curhat' | 'filosofi';

export interface EmotionInfo {
  id: EmotionType;
  label: string;
  badgeLabel: string;
  indonesianTitle: string;
  description: string;
  definition: string;
  // Deep Educational Content:
  physicalSigns: string[]; // Tanda fisik di sekolah
  psychologicalSigns: string[]; // Tanda psikologis di sekolah
  brainScience: {
    headline: string;
    explanation: string;
    neuroConcept: string; // e.g. Amygdala hijack, Dopamine crash, Prefrontal overload
  };
  copingSteps: {
    step: string;
    detail: string;
    techniqueName: string; // e.g. Grounding 5-4-3-2-1, Thought Dump, Pomodoro
  }[];
  quickQuiz: {
    question: string;
    insight: string;
  };
  accentColor: {
    primary: string;
    bgSoft: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    glowRing: string;
  };
}

export interface ScreeningResult {
  emotion: EmotionType;
  emotionLabel: string;
  story: string;
  notesForYou: string; // Validasi emosi dan analisis yang hangat & personal
  smallSteps: string[]; // Saran coping praktis dan spesifik
  reflectiveQuestion?: string; // 1 pertanyaan panduan reflektif di akhir
  timestamp: string;
}
