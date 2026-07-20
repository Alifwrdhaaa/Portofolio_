import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from '../ui/SpotlightCard';

const certificates = [
  { 
    id: 1, 
    title: "IT Support", 
    issuer: "MagangHub", 
    year: "2025",
    description: "Program magang IT Support di Kementerian Ketenagakerjaan. Berperan aktif dalam pembuatan website internal dan divisi, serta membantu penyusunan dashboard RUP 2025.",
    image: "/sertif-1.png"
  },
  { 
    id: 2, 
    title: "UI/UX Design", 
    issuer: "Binar Academy", 
    year: "2024",
    description: "Sertifikasi intensif UI/UX Design. Menguasai alur riset pengguna, wireframing, pembuatan prototipe interaktif, serta desain antarmuka yang estetis dan fungsional.",
    image: "/sertif-2.png"
  },
  { 
    id: 3, 
    title: "Pengoperasian Komputer", 
    issuer: "BNSP", 
    year: "2024",
    description: "Sertifikasi kompetensi pengoperasian komputer perkantoran. Mencakup penguasaan dan kemahiran menggunakan aplikasi Microsoft Word, Excel, dan PowerPoint.",
    image: "/sertif-3.png"
  },
  { 
    id: 4, 
    title: "Fullstack Web Development", 
    issuer: "MSIB Kampus Merdeka", 
    year: "2023",
    description: "Program studi independen intensif pengembangan web fullstack. Berfokus pada perancangan arsitektur backend menggunakan framework Laravel dan integrasi frontend interaktif.",
    image: "/sertif-4.png"
  },
  { 
    id: 5, 
    title: "Teknisi Jaringan Komputer", 
    issuer: "BNSP", 
    year: "2021",
    description: "Sertifikasi kompetensi teknisi jaringan. Menguasai instalasi perangkat, crimping kabel RJ45, konfigurasi router, serta perancangan topologi jaringan lokal (LAN).",
    image: "/sertif-5.png"
  }
];

const Certificates = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="certificates" className="w-full max-w-[1450px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16 lg:py-24 text-white relative z-10 border-t border-gray-800/50">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-3 leading-[1.1]">My Certifications</h2>
        <p className="text-white/55 max-w-xl mx-auto text-lg leading-relaxed">
          Validasi keterampilan dan pencapaian profesional yang telah saya raih di berbagai bidang teknologi.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <SpotlightCard className="h-full flex flex-col p-6 group">
              {/* Gambar Sertifikat (Bisa di-klik) */}
              <div 
                className="w-full h-48 rounded-xl overflow-hidden mb-6 relative cursor-pointer flex-shrink-0"
                onClick={() => setSelectedImage(cert.image)}
              >
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                {/* Overlay Icon Zoom In (Muncul saat di-hover) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white">{cert.title}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">{cert.description}</p>
              
              <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono text-indigo-300">
                <span>{cert.issuer}</span>
                <span>{cert.year}</span>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      {/* Lightbox / Modal untuk menampilkan gambar full-screen */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8 cursor-zoom-out backdrop-blur-sm"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Certificate Preview"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup jika klik gambarnya saja
            />
            
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white/50 hover:text-white transition-colors p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
