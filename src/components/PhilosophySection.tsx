import React from 'react';
import { AkasaLogo } from './AkasaLogo';
import { ShieldCheck, HeartHandshake, Compass, AlertTriangle, ArrowRight } from 'lucide-react';

interface PhilosophySectionProps {
  onGoToCurhat?: () => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ onGoToCurhat }) => {
  return (
    <div id="page-filosofi" className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Identitas: Modern Geometric Sans-Serif */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <span className="text-xs font-bold tracking-widest text-[#4A3E7D] uppercase mb-2 block font-geometric">
            Identitas & Prinsip Layanan
          </span>
          <h1
            id="philosophy-title"
            className="font-geometric text-3xl sm:text-5xl font-extrabold text-[#221F1F] tracking-tight mb-4"
          >
            Filosofi & Identitas AKASA
          </h1>
          <p className="text-base sm:text-lg text-[#221F1F]/75 leading-[1.6] max-w-2xl mx-auto font-sans">
            &ldquo;Karena di balik setiap seragam putih abu-abu, ada manusia yang berhak didengar tanpa harus selalu dipaksa kuat.&rdquo;
          </p>
        </div>

        {/* Makna Nama & Ruang Aman */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16">
          <div className="md:col-span-5 bg-[#F0EEF8]/80 p-8 rounded-3xl border border-[#4A3E7D]/12 flex flex-col items-center text-center shadow-warm-card">
            <div className="mb-6 p-4 rounded-2xl bg-white shadow-xs border border-[#4A3E7D]/10">
              <AkasaLogo size="lg" showText={false} />
            </div>

            <h2 className="font-geometric text-xl font-bold text-[#221F1F] mb-2">
              Makna di Balik &ldquo;Akasa&rdquo;
            </h2>
            <p className="text-sm text-[#221F1F]/75 leading-[1.6] mb-5">
              Dalam bahasa Sansekerta, <em>Akasa</em> berarti angkasa raya: ruang lapang tanpa batas tempat badai dan awan gelap bisa lewat dan reda tanpa pernah mengubah ketenangan langit aslinya.
            </p>
            <div className="text-xs font-semibold px-4 py-2 rounded-full bg-white text-[#4A3E7D] border border-[#4A3E7D]/15 shadow-2xs">
              Ruang di Mana Setiap Emosi Diterima Utuh
            </div>
          </div>

          <div className="md:col-span-7 space-y-4 text-left">
            <div className="p-6 rounded-2xl bg-white border border-[#4A3E7D]/10 shadow-xs transition-all duration-300 hover:shadow-soft-float">
              <div className="flex items-center gap-2.5 mb-2">
                <Compass className="w-5 h-5 text-[#4A3E7D]" />
                <h3 className="text-base font-bold text-[#221F1F] font-geometric">
                  Visi AKASA
                </h3>
              </div>
              <p className="text-sm text-[#221F1F]/75 leading-[1.6]">
                Mewujudkan ekosistem belajar yang sehat secara emosional bagi pelajar SMA di Indonesia, di mana kesehatan mental dipandang setara pentingnya dengan prestasi akademik.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#4A3E7D]/10 shadow-xs transition-all duration-300 hover:shadow-soft-float">
              <div className="flex items-center gap-2.5 mb-2">
                <HeartHandshake className="w-5 h-5 text-[#4A3E7D]" />
                <h3 className="text-base font-bold text-[#221F1F] font-geometric">
                  Misi Kami
                </h3>
              </div>
              <p className="text-sm text-[#221F1F]/75 leading-[1.6]">
                Menghadirkan psikoedukasi yang membumi dan ruang refleksi digital yang aman, privat, serta bebas stigma untuk membantu siswa mengurai beban pikiran sebelum menumpuk menjadi krisis.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#4A3E7D]/10 shadow-xs transition-all duration-300 hover:shadow-soft-float">
              <div className="flex items-center gap-2.5 mb-2">
                <ShieldCheck className="w-5 h-5 text-[#1E7E45]" />
                <h3 className="text-base font-bold text-[#221F1F] font-geometric">
                  Nilai Empati & Ruang Aman Digital
                </h3>
              </div>
              <p className="text-sm text-[#221F1F]/75 leading-[1.6]">
                Kami percaya pada validasi tanpa penghakiman. Dirimu lebih berharga dari sekadar angka di lembar rapor atau peringkat kelas.
              </p>
            </div>
          </div>
        </div>

        {/* Batasan Peran & First-Line Support (PENTING) */}
        <div className="bg-[#F0EEF8]/60 rounded-3xl border border-[#4A3E7D]/12 p-6 sm:p-10 shadow-warm-card mb-14 text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold mb-4">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Batasan Peran: First-Line Support</span>
            </div>

            <h2 className="font-geometric text-xl sm:text-2xl font-bold text-[#221F1F] mb-3">
              Peran AKASA Sebagai Teman Refleksi Awal
            </h2>
            <p className="text-sm sm:text-base text-[#221F1F]/80 leading-[1.6] mb-6">
              AKASA dirancang khusus sebagai <strong>media pertolongan pertama (first-line support)</strong> dan wadah belajar mengenali emosi diri. Layanan ini menjadi jembatan awal agar kamu tidak memendam stres sendirian.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-[#4A3E7D]/10">
              <div className="p-5 rounded-2xl bg-white/90 border border-[#4A3E7D]/10">
                <h4 className="text-sm font-bold text-[#221F1F] mb-2 flex items-center gap-2 font-geometric">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1E7E45]"></span>
                  Yang Dilakukan AKASA
                </h4>
                <ul className="text-xs sm:text-sm text-[#221F1F]/75 space-y-2 list-disc pl-4 leading-[1.6]">
                  <li>Memberikan edukasi jenis emosi stres akademik</li>
                  <li>Mendengarkan curhatan privat tanpa penghakiman</li>
                  <li>Memberikan saran coping praktis langkah kecil</li>
                  <li>Mengajak refleksi diri dengan pertanyaan panduan</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-white/90 border border-[#4A3E7D]/10">
                <h4 className="text-sm font-bold text-[#221F1F] mb-2 flex items-center gap-2 font-geometric">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  Batasan Tanggung Jawab
                </h4>
                <ul className="text-xs sm:text-sm text-[#221F1F]/75 space-y-2 list-disc pl-4 leading-[1.6]">
                  <li>Bukan pengganti diagnosis klinis psikolog atau psikiater</li>
                  <li>Bukan layanan terapi medis formal</li>
                  <li>Tidak menyimpan data riwayat obrolan di server publik</li>
                  <li>Jika mengalami krisis berat, disarankan segera ke BK atau profesional</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Layanan Bantuan Lebih Lanjut */}
        <div className="bg-[#E8E2F7]/50 border border-[#4A3E7D]/15 rounded-3xl p-6 sm:p-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h3 className="text-sm sm:text-base font-bold text-[#221F1F] font-geometric">
                Butuh Bantuan Lebih Lanjut?
              </h3>
              <p className="text-xs sm:text-sm text-[#221F1F]/70 mt-1 leading-[1.6]">
                Kamu bisa menghubungi Guru Bimbingan Konseling (BK) di sekolahmu atau layanan Hotline Kesehatan Mental Indonesia.
              </p>
            </div>

            {onGoToCurhat && (
              <button
                type="button"
                onClick={onGoToCurhat}
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4A3E7D] text-white text-xs sm:text-sm font-bold hover:bg-[#3D3268] transition-all duration-300 ease-in-out cursor-pointer shadow-xs hover:shadow-md active:scale-95"
              >
                <span>Buka Ruang Curhat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
