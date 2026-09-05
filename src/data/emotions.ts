import { EmotionInfo, EmotionType } from '../types';

export const EMOTIONS: EmotionInfo[] = [
  {
    id: 'burnout',
    label: 'Burnout',
    indonesianTitle: 'Kelelahan Kronis',
    description: 'Kelelahan mental dan fisik akibat tekanan belajar berkepanjangan.',
    definition: 'Kondisi stres berkepanjangan di mana tubuh dan pikiran merasa terkuras habis hingga terasa hampa.',
    signs: [
      'Merasa lelah terus-menerus walau sudah tidur cukup',
      'Mudah sinis atau kehilangan arti dalam belajar',
      'Konsentrasi dan daya tangkap menurun drastis'
    ],
    immediateReliefTip: 'Berhenti total dari layar dan buku selama 20 menit, tarik napas 4-7-8, minum segelas air hangat.',
    colorHex: '#6851A4'
  },
  {
    id: 'anxious',
    label: 'Anxious',
    indonesianTitle: 'Kecemasan / Gelisah',
    description: 'Rasa cemas dan gelisah berlebih menghadapi ujian atau tugas.',
    definition: 'Ketakutan atau kekhawatiran intens tentang masa depan, ekspektasi nilai, atau ujian yang akan datang.',
    signs: [
      'Jantung berdebar lebih cepat atau dada terasa sesak',
      'Pikiran berputar memikirkan skenario terburuk',
      'Tangan dingin, gelisah, atau sulit duduk tenang'
    ],
    immediateReliefTip: 'Lakukan teknik grounding 5-4-3-2-1: cari 5 benda yang kamu lihat, 4 yang bisa disentuh, dan 3 yang terdengar.',
    colorHex: '#6851A4'
  },
  {
    id: 'overwhelmed',
    label: 'Overwhelmed',
    indonesianTitle: 'Kewalahan Menumpuk',
    description: 'Perasaan kewalahan karena terlalu banyak hal yang harus dikerjakan sekaligus.',
    definition: 'Sensasi seperti tenggelam oleh tumpukan tugas, deadline, dan ekspektasi yang datang bersamaan.',
    signs: [
      'Bingung harus mulai dari mana hingga akhirnya membeku (freeze)',
      'Merasa beban di pundak terasa sangat berat',
      'Mudah panik saat melihat daftar jadwal pelajaran'
    ],
    immediateReliefTip: 'Tutup semua tab kecuali satu hal terkecil yang butuh waktu 5 menit untuk diselesaikan.',
    colorHex: '#6851A4'
  },
  {
    id: 'exhausted',
    label: 'Exhausted',
    indonesianTitle: 'Energi Habis',
    description: 'Kondisi energi emosional habis dan butuh rehat sejenak.',
    definition: 'Baterai diri berada di angka 1%, butuh pemulihan tanpa rasa bersalah.',
    signs: [
      'Mata perih, otot kaku, dan respon lambat',
      'Tidak ingin diajak bicara atau membuka pesan grup kelas',
      'Emosi menjadi sensitif dan mudah menangis'
    ],
    immediateReliefTip: 'Izinkan dirimu rebahan tanpa distraksi ponsel selama 15 menit. Tubuhmu sedang meminta waktu.',
    colorHex: '#6851A4'
  },
  {
    id: 'demotivated',
    label: 'Demotivated',
    indonesianTitle: 'Kehilangan Motivasi',
    description: 'Kehilangan dorongan atau alasan untuk memulai belajar.',
    definition: 'Rasa apatis dan hampa, bertanya-tanya "untuk apa aku belajar keras?" tanpa dorongan bertindak.',
    signs: [
      'Menunda-nunda tugas berjam-jam (prokrastinasi ekstrem)',
      'Merasa usaha yang dilakukan tidak akan ada hasilnya',
      'Materi pelajaran yang biasanya menarik kini terasa hambar'
    ],
    immediateReliefTip: 'Lakukan aturan 2 Menit: buka buku dan baca 1 kalimat saja tanpa target menghafal apapun.',
    colorHex: '#6851A4'
  }
];

export const getEmotionById = (id: EmotionType): EmotionInfo => {
  return EMOTIONS.find((e) => e.id === id) || EMOTIONS[0];
};
