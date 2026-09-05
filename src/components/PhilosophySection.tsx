import React from 'react';
import { AkasaLogo } from './AkasaLogo';

export const PhilosophySection: React.FC = () => {
  return (
    <section
      id="filosofi-akasa"
      className="py-16 md:py-24 bg-white border-t border-[#221F1F]/6 scroll-mt-16"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <p className="text-xs font-bold tracking-widest text-[#6851A4] uppercase mb-2">
            Pesan dari Pembuat
          </p>
          <h2
            id="philosophy-title"
            className="font-serif text-2xl sm:text-4xl font-bold text-[#221F1F] tracking-tight mb-4"
          >
            Mengapa AKASA Dihadirkan?
          </h2>
          <p className="text-base sm:text-lg text-[#221F1F]/75 leading-relaxed font-serif italic max-w-2xl mx-auto">
            &ldquo;Karena di balik setiap seragam putih abu-abu, ada manusia yang berhak didengar tanpa harus selalu dipaksa kuat.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left card with emblem & meaning */}
          <div className="md:col-span-5 bg-[#FAF8F6] p-8 rounded-2xl border border-[#221F1F]/8 flex flex-col items-center text-center shadow-warm-card">
            <div className="mb-6 p-4 rounded-2xl bg-white shadow-xs border border-[#221F1F]/6">
              <AkasaLogo size="lg" showText={false} />
            </div>

            <h3 className="font-serif text-xl font-bold text-[#221F1F] mb-2">
              Makna di Balik &ldquo;Akasa&rdquo;
            </h3>
            <p className="text-sm text-[#221F1F]/75 leading-relaxed mb-5">
              Dalam bahasa Sansekerta, <em>Akasa</em> berarti angkasa raya — ruang lapang tanpa batas tempat badai dan awan gelap bisa lewat dan reda tanpa pernah mengubah ketenangan langit aslinya.
            </p>
            <div className="text-xs font-semibold px-4 py-2 rounded-full bg-white text-[#6851A4] border border-[#6851A4]/20 shadow-xs">
              Ruang di Mana Setiap Emosi Diterima Utuh
            </div>
          </div>

          {/* Right points: Genuine human thoughts */}
          <div className="md:col-span-7 space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F6]/60 border border-[#221F1F]/6 hover:bg-[#FAF8F6] transition-colors">
              <h4 className="text-base font-bold text-[#221F1F] mb-1.5 font-serif">
                Dirimu Lebih Berharga dari Angka di Rapor
              </h4>
              <p className="text-sm text-[#221F1F]/75 leading-relaxed">
                Di lingkungan sekolah, kita sering diukur semata-mata dari nilai ujian dan pencapaian akademik. Di AKASA, kami ingin mengingatkan bahwa kamu tetap berharga bahkan saat sedang gagal atau merasa tertinggal.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F6]/60 border border-[#221F1F]/6 hover:bg-[#FAF8F6] transition-colors">
              <h4 className="text-base font-bold text-[#221F1F] mb-1.5 font-serif">
                Didengar Tanpa Ceramah atau Perbandingan
              </h4>
              <p className="text-sm text-[#221F1F]/75 leading-relaxed">
                Sering kali saat bercerita, kita malah dibandingkan dengan orang lain atau disuruh langsung move-on. Di sini, perasaan lelah dan bingungmu divalidasi sepenuhnya tanpa ada penghakiman.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F6]/60 border border-[#221F1F]/6 hover:bg-[#FAF8F6] transition-colors">
              <h4 className="text-base font-bold text-[#221F1F] mb-1.5 font-serif">
                Langkah Kecil yang Masuk Akal
              </h4>
              <p className="text-sm text-[#221F1F]/75 leading-relaxed">
                Kamu tidak dituntut menyelesaikan semua masalah hidup dalam semalam. Cukup ambil satu tarikan napas lega, minum segelas air, dan jalani langkah kecil yang bisa kamu lakukan detik ini.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
