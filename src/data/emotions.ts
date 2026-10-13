import { EmotionInfo, EmotionType } from '../types';

export const EMOTIONS: EmotionInfo[] = [
  {
    id: 'burnout',
    label: 'Burnout',
    badgeLabel: 'Burnout',
    indonesianTitle: 'Kelelahan Mental Kronis',
    description: 'Kelelahan emosional dan fisik akibat akumulasi beban belajar tanpa jeda istirahat yang cukup.',
    definition: 'Kondisi stres berkepanjangan di mana tubuh dan pikiran merasa terkuras habis hingga terasa hampa.',
    physicalSigns: [
      'Tubuh terasa lemas konstan walau sudah tidur berjam-jam',
      'Sakit kepala tegang (tension headache) dan pegal di pundak atau leher',
      'Daya tahan tubuh menurun, gampang flu atau meriang menjelang ujian'
    ],
    psychologicalSigns: [
      'Sinisme atau rasa acuh tak acuh terhadap tugas dan hasil ulangan',
      'Merasa tidak kompeten dan kehilangan keyakinan diri (self-doubt)',
      'Konsentrasi buyar, membaca satu paragraf berkali-kali tanpa bisa menangkap artinya'
    ],
    brainScience: {
      headline: 'Kortisol Berlebih & Penurunan Volume Prefrontal Cortex',
      neuroConcept: 'HPA-Axis Overactivation',
      explanation: 'Saat kamu memaksakan diri belajar tanpa rehat berminggu-minggu, hormon stres kortisol terus membanjiri otak. Hal ini menumpulkan aktivitas korteks prefrontal (bagian otak untuk logika dan fokus) serta mengecilkan sensitivitas memori kerja di hipokampus. Otakmu bukan rusak, melainkan sedang mengaktifkan mode darurat pelindung diri.'
    },
    copingSteps: [
      {
        techniqueName: 'Radical Rest 20 Menit',
        step: 'Putus kontak total dari gadget, buku, dan musik bertempo cepat selama 20 menit.',
        detail: 'Rebahkan tubuh di kasur atau karpet dengan mata terpejam, biarkan otak masuk ke mode default tanpa input informasi baru.'
      },
      {
        techniqueName: 'Dekonstruksi Standar Sempurna',
        step: 'Ubah target dari "harus selesai sempurna" menjadi "cukup 60% selesai hari ini".',
        detail: 'Mengerjakan tugas seadanya jauh lebih sehat daripada stres menargetkan kesempurnaan lalu akhirnya menyerah total.'
      },
      {
        techniqueName: 'Peregangan Saraf Vagus',
        step: 'Lakukan tarikan napas panjang 4 detik, lalu buang pelan lewat mulut 8 detik sebanyak 5 kali.',
        detail: 'Ini menstimulasi saraf vagus untuk menurunkan detak jantung dan meredakan ketegangan otot leher yang kaku.'
      }
    ],
    quickQuiz: {
      question: 'Kapan terakhir kali kamu menghabiskan waktu 2 jam tanpa kepikiran tugas sekolah sama sekali?',
      insight: 'Jika kamu kesulitan mengingatnya, baterai tubuhmu sudah beroperasi di mode darurat (power saving).'
    },
    accentColor: {
      primary: '#9333EA', // Rich Purple
      bgSoft: '#FAF5FF',
      border: '#E9D5FF',
      badgeBg: '#F3E8FF',
      badgeText: '#7E22CE',
      glowRing: 'ring-purple-200'
    }
  },
  {
    id: 'anxious',
    label: 'Anxious',
    badgeLabel: 'Anxious',
    indonesianTitle: 'Kecemasan & Gelisah Belajar',
    description: 'Rasa cemas intens, dada berdebar, atau takut berlebih terhadap ujian, ulangan dadakan, dan ekspektasi nilai.',
    definition: 'Ketakutan atau kekhawatiran antisipatif tentang masa depan, evaluasi akademik, atau skenario terburuk.',
    physicalSigns: [
      'Jantung berdegup kencang, napas terasa pendek atau dada sesak',
      'Telapak tangan dingin, gemetar, atau keringat dingin di kelas',
      'Perut melilit atau mual tiba-tiba sebelum jam ulangan dimulai'
    ],
    psychologicalSigns: [
      'Pikiran bencana (catastrophizing): "Kalau nilai ini jelek, masa depanku hancur"',
      'Overthinking terus-menerus memutar ulang kata-kata guru atau teman',
      'Kesulitan duduk tenang, merasa gelisah seperti ada bahaya yang mengintai'
    ],
    brainScience: {
      headline: 'Pembajakan Amigdala (Amygdala Hijack)',
      neuroConcept: 'Fight-or-Flight System',
      explanation: 'Otak bagian amigdala (pusat deteksi ancaman) memperlakukan ulangan atau nilai jelek seperti ancaman fisik singa purba. Amigdala memompa adrenalin dan membungkam otak rasional (neokorteks), sehingga tubuhmu merasa panik dan tidak bisa berpikir jernih meskipun kamu sudah belajar semalaman.'
    },
    copingSteps: [
      {
        techniqueName: 'Teknik Grounding 5-4-3-2-1',
        step: 'Sebutkan 5 benda yang kamu lihat, 4 yang bisa disentuh, 3 suara terdengar, 2 aroma, dan 1 rasa lidah.',
        detail: 'Teknik ini memaksa sensor indera mengembalikan kesadaranmu ke saat ini (here & now), memutus rantai overthinking.'
      },
      {
        techniqueName: 'Thought Dumping (Muntahkan Pikiran)',
        step: 'Tuliskan semua ketakutanmu di secarik kertas tanpa diedit selama 3 menit.',
        detail: 'Memindahkan kecemasan dari memori kerja kepala ke lembaran kertas nyata terbukti menurunkan aktivitas amigdala.'
      },
      {
        techniqueName: 'Latihan Napas Kotak (Box Breathing)',
        step: 'Tarik napas 4 detik, tahan 4 detik, buang 4 detik, tahan kosong 4 detik.',
        detail: 'Digunakan oleh atlet dan profesional untuk menstabilkan sistem saraf otonom saat menghadapi situasi ujian yang menekan.'
      }
    ],
    quickQuiz: {
      question: 'Apakah hal buruk yang kamu takutkan 1 bulan lalu benar-benar terjadi persis seperti bayanganmu?',
      insight: '90% ketakutan di kepala siswa tidak pernah terjadi seperti skenario terburuk yang dibayangkan.'
    },
    accentColor: {
      primary: '#0284C7', // Sky / Azure
      bgSoft: '#F0F9FF',
      border: '#BAE6FD',
      badgeBg: '#E0F2FE',
      badgeText: '#0369A1',
      glowRing: 'ring-sky-200'
    }
  },
  {
    id: 'overwhelmed',
    label: 'Overwhelmed',
    badgeLabel: 'Overwhelmed',
    indonesianTitle: 'Kewalahan Menumpuk',
    description: 'Sensasi tenggelam oleh deadline tugas, proyek kelompok, les sore, dan materi ujian yang datang serentak.',
    definition: 'Kondisi kapasitas kognitif meluap akibat terlalu banyak stimuli dan tuntutan tugas yang harus diproses sekaligus.',
    physicalSigns: [
      'Kepala terasa berat, pusing berdenyut seperti terikat tali',
      'Respons melambat, tatapan kosong saat menatap layar gawai atau buku',
      'Ketegangan di rahang gigi yang tanpa sadar terkatup rapat'
    ],
    psychologicalSigns: [
      'Freeze response: Bingung harus mulai dari mana hingga akhirnya tidak mengerjakan apapun',
      'Sensitif dan mudah tersinggung jika diajak bicara orang rumah',
      'Perasaan seperti berada di bawah air atau ditekan beban berton-ton'
    ],
    brainScience: {
      headline: 'Cognitive Cognitive Load Explosion & Sensory Overload',
      neuroConcept: 'Working Memory Bottleneck',
      explanation: 'Memori kerja otak manusia hanya bisa menampung 4 hingga 7 informasi aktif sekaligus. Ketika kamu memikirkan PR matematika, essay bahasa Inggris, jadwal les, dan ujian sejarah secara bersamaan, otak mengalami kemacetan total (bottleneck). Hasilnya bukan malas, melainkan macet kognitif.'
    },
    copingSteps: [
      {
        techniqueName: 'Aturan 1 Tugas Saja (Single-Tasking)',
        step: 'Sembunyikan semua buku tugas lain, sisakan HANYA SATU buku yang paling mudah di mejamu.',
        detail: 'Melihat meja yang bersih membebaskan 50% kapasitas visual memori kerja dari rasa kewalahan.'
      },
      {
        techniqueName: 'Matriks Eisenhower Sederhana',
        step: 'Bagi catatanmu menjadi: "Wajib Besok" dan "Bisa Ditunda". Kerjakan hanya bagian wajib besok.',
        detail: 'Kamu tidak harus menaklukkan seluruh tugas semester dalam satu malam yang sama.'
      },
      {
        techniqueName: 'Mikro-Jeda 5 Menit Berdiri',
        step: 'Berdiri dari kursi, tatap keluar jendela yang jauh, dan minumlah 1 gelas air putih.',
        detail: 'Mengubah fokus pandangan mata dari jarak 30 cm ke objek jauh di luar jendela merilekskan otot mata dan saraf kepala.'
      }
    ],
    quickQuiz: {
      question: 'Berapa banyak tab tugas atau buku pelajaran yang terbuka di depanmu saat ini?',
      insight: 'Jika lebih dari 3 tab aktif sekaligus, otakmu sedang mengalami kelebihan beban visual tanpa disadari.'
    },
    accentColor: {
      primary: '#D97706', // Warm Amber / Orange
      bgSoft: '#FFFBEB',
      border: '#FDE68A',
      badgeBg: '#FEF3C7',
      badgeText: '#B45309',
      glowRing: 'ring-amber-200'
    }
  },
  {
    id: 'exhausted',
    label: 'Exhausted',
    badgeLabel: 'Exhausted',
    indonesianTitle: 'Energi Habis & Kelelahan Fisik',
    description: 'Kondisi baterai tubuh dan pikiran berada di titik terendah, butuh pemulihan tanpa rasa bersalah.',
    definition: 'Kondisi cadangan energi mental dan fisik terkuras habis (battery 1%), membuat tubuh rapuh dan membutuhkan istirahat restoratif mendalam.',
    physicalSigns: [
      'Mata perih berair, otot bahu dan leher terasa kaku berat',
      'Respons melambat, tubuh lemas dan sulit bangun dari tempat tidur',
      'Sering menguap konstan dan kepala terasa pening seperti kurang oksigen'
    ],
    psychologicalSigns: [
      'Sensitivitas emosi meningkat, mudah menangis atau merasa tersentuh oleh hal kecil',
      'Tidak sanggup diajak bicara panjang atau membuka pesan obrolan kelas',
      'Merasa hampa dan kehilangan tenaga untuk peduli pada tugas hari ini'
    ],
    brainScience: {
      headline: 'Penurunan Cadangan Energi Glukosa Serebral & Adenosin Menumpuk',
      neuroConcept: 'Adenosine Buildup & Neuro-Energy Depletion',
      explanation: 'Saat otak dipakai belajar berjam-jam tanpa tidur cukup, molekul adenosin menumpuk di reseptor otak dan memicu sinyal kantuk berat alami. Cadangan glukosa otak habis, sehingga memaksakan diri membaca materi hanya akan sia-sia karena otak tidak lagi sanggup mengonsolidasi memori baru.'
    },
    copingSteps: [
      {
        techniqueName: 'Power Nap Restoratif 20 Menit',
        step: 'Pejamkan mata di ruangan redup tanpa alarm bising selama 20 menit penuh.',
        detail: 'Tidur singkat 20 menit membersihkan akumulasi adenosin dan menyegarkan konsentrasi tanpa membuatmu pusing bangun.'
      },
      {
        techniqueName: 'Rehidrasi & Basuh Wajah Air Dingin',
        step: 'Minum 2 gelas air mineral dan basuh wajah dengan air sejuk dari dahi hingga leher.',
        detail: 'Memicu mammalian dive reflex yang seketika menenangkan denyut nadi dan menyegarkan saraf kranial wajah.'
      },
      {
        techniqueName: 'Prioritas Tidur 7-8 Jam Malam Ini',
        step: 'Tutup buku lebih awal dan prioritaskan tidur malam tepat waktu dibanding begadang.',
        detail: '7 jam tidur malam jauh lebih berharga daripada 3 jam begadang dengan daya tangkap otak yang sudah kosong.'
      }
    ],
    quickQuiz: {
      question: 'Berapa jam kamu tidur nyenyak dalam 3 hari terakhir?',
      insight: 'Tidur di bawah 6 jam menurunkan daya serap materi belajar hingga 40% pada hari berikutnya.'
    },
    accentColor: {
      primary: '#0D9488', // Teal / Calm Emerald
      bgSoft: '#F0FDFA',
      border: '#99F6E4',
      badgeBg: '#CCFBF1',
      badgeText: '#0F766E',
      glowRing: 'ring-teal-200'
    }
  },
  {
    id: 'demotivated',
    label: 'Demotivated',
    badgeLabel: 'Demotivated',
    indonesianTitle: 'Kehilangan Motivasi Belajar',
    description: 'Kehilangan dorongan, minat, atau alasan untuk mulai belajar, merasa hampa dan terjebak prokrastinasi.',
    definition: 'Kondisi apatis dan hilangnya dorongan internal untuk beraktivitas akademik, sering diiringi pertanyaan sinis tentang arti perjuangan belajar.',
    physicalSigns: [
      'Menunda-nunda tugas berjam-jam (prokrastinasi ekstrem) dengan tatapan kosong',
      'Tubuh terasa berat untuk sekadar duduk di meja belajar dan membuka buku',
      'Mengalihkan perhatian secara kompulsif ke hal yang tidak penting'
    ],
    psychologicalSigns: [
      'Pikiran: "Buat apa aku belajar keras kalau hasilnya tetap segini-gini aja?"',
      'Kehilangan rasa tertarik pada materi pelajaran yang sebelumnya disukai',
      'Merasa usaha yang dikeluarkan tidak akan ada dampaknya'
    ],
    brainScience: {
      headline: 'Dopamine Deficiency & Anhedonia Akademik Sementara',
      neuroConcept: 'Reward Prediction Error & Low Dopamine Drive',
      explanation: 'Motivasi digerakkan oleh neurotransmiter dopamin yang mengantisipasi hadiah atau kepuasan. Ketika kamu terus-menerus merasa usahamu tidak berbuah hasil manis, sirkuit reward otak mengalami kelelahan dan menolak melepaskan dopamin, memicu rasa hampa dan hilangnya dorongan bertindak.'
    },
    copingSteps: [
      {
        techniqueName: 'Aturan 2 Menit (Micro-Momentum)',
        step: 'Janjikan pada diri sendiri hanya akan membaca SATU baris kalimat atau 2 menit saja tanpa target hafalan.',
        detail: 'Menurunkan ekspektasi hingga ke titik termudah merontokkan hambatan mental awal untuk memulai.'
      },
      {
        techniqueName: 'Pindah Lokasi & Ubah Suasana',
        step: 'Pindahkan posisi meja, rapikan satu sudut saja, atau pindah belajar ke teras rumah yang sejuk.',
        detail: 'Perubahan stimulus visual memicu sinyal kesegaran baru pada otak yang sedang jenuh.'
      },
      {
        techniqueName: 'Tulis Impian Kecil Non-Akademik',
        step: 'Tuliskan di kertas kecil satu hal menyenangkan yang ingin kamu nikmati di akhir pekan.',
        detail: 'Mengingatkan otak bahwa hidupmu tidak hanya seputar angka rapor membantu memulihkan energi emosional.'
      }
    ],
    quickQuiz: {
      question: 'Apakah semangatmu yang sedang redup hari ini berarti kamu orang yang gagal?',
      insight: 'Motivasi itu pasang surut seperti ombak laut; kamu tetap berharga walau hari ini sedang melambat.'
    },
    accentColor: {
      primary: '#E11D48', // Rose
      bgSoft: '#FFF1F2',
      border: '#FECDD3',
      badgeBg: '#FFE4E6',
      badgeText: '#BE123C',
      glowRing: 'ring-rose-200'
    }
  }
];

export const getEmotionById = (id: EmotionType): EmotionInfo => {
  return EMOTIONS.find((e) => e.id === id) || EMOTIONS[0];
};
