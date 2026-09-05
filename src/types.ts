export type EmotionType = 'burnout' | 'anxious' | 'overwhelmed' | 'exhausted' | 'demotivated';

export interface EmotionInfo {
  id: EmotionType;
  label: string;
  indonesianTitle: string;
  description: string;
  definition: string;
  signs: string[];
  immediateReliefTip: string;
  colorHex: string;
}

export interface ScreeningResult {
  emotion: EmotionType;
  emotionLabel: string;
  story: string;
  notesForYou: string; // Kalimat validasi emosi yang hangat dan penuh empati
  smallSteps: string[]; // 3 saran praktis yang tidak memberatkan
  timestamp: string;
}
