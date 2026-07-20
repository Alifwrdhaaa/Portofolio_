import React from 'react';
import { motion } from 'framer-motion';
import ProfileCard from '../ui/ProfileCard';

const About = () => {
  return (
    <section id="about" className="relative w-full py-16 lg:py-32 z-10 bg-transparent">
      {/* Actual About Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Kolom Kiri: Foto / Visual (Slide from Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] aspect-[4/5] mx-auto lg:mx-0"
          >
            {/* Konten Gambar Menggunakan ProfileCard React Bits */}
            <div className="absolute inset-0 bg-transparent flex items-center justify-center z-10 w-full h-full mx-auto">
              <ProfileCard
                name="M Alief Wardana"
                title="Frontend Developer"
                handle="aliefwardana"
                status="Online"
                contactText="Contact Me"
                avatarUrl="/profile.jpg"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={true}
                onContactClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                behindGlowColor="rgba(99, 102, 241, 0.67)"
                iconUrl="/iconpattern.png"
                behindGlowEnabled={true}
                innerGradient="linear-gradient(145deg, rgba(99,102,241,0.2) 0%, rgba(168,85,247,0.1) 100%)"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Kolom Kanan: Teks About (Slide from Right) */}
          <div className="flex flex-col space-y-6 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <h2 className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-3 flex items-center">
                <span className="w-8 h-px bg-indigo-400 mr-4"></span>
                About Me
              </h2>
              <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
                Membangun Web, Mewujudkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Ide.</span>
              </h3>
              
              <div className="space-y-4 text-gray-400 text-base leading-relaxed">
                <p>
                  Halo! Saya <span className="text-gray-200 font-semibold">Muhammad Alief Wardana</span>, seorang Frontend Developer yang antusias dalam menciptakan antarmuka web yang tidak hanya indah dipandang, tetapi juga intuitif dan fungsional.
                </p>
                <p>
                  Bagi saya, *coding* bukan hanya sekadar merangkai baris kode, melainkan seni memecahkan masalah. Saya selalu berusaha menjaga kode tetap bersih, terstruktur, dan mengikuti standar terbaik agar mudah dikembangkan di masa depan.
                </p>
                <p>
                  Di luar dunia pemrograman, saya suka mengeksplorasi hal-hal baru dan terus menantang diri untuk belajar teknologi terkini, karena saya percaya inovasi tidak pernah berhenti.
                </p>
              </div>

              {/* Stats atau Info Tambahan */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-800/50">
                <div>
                  <h4 className="text-4xl font-black text-white">2+</h4>
                  <p className="text-sm text-gray-500 font-mono mt-1">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-white">10+</h4>
                  <p className="text-sm text-gray-500 font-mono mt-1">Projects Completed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
