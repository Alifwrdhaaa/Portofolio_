import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlurText from '../ui/BlurText';
import Lanyard from '../ui/Lanyard';

const Hero = () => {
  const roles = ["Web developer", "UI/UX Design", "Fresh graduate"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Desktop Lanyard Background (Lebar 150% dan left-0 membuat titik tengahnya persis di 75% layar (kanan), namun tetap menutupi seluruh layar kiri agar tidak terpotong) */}
      <div className="absolute top-0 left-0 w-[150%] h-screen z-0 hidden lg:flex items-center justify-center">
        <Lanyard
          position={[0, 0, 20]}
          gravity={[0, -40, 0]}
          frontImage="/profile.jpg"
          backImage="/profile.jpg"
          zoom={1.2}
          cardScale={1.3}
        />
      </div>

      {/* Kontainer Utama - pointer-events-none agar event mouse tembus ke 3D Canvas di belakangnya */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-center pointer-events-none">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full"
        >
          {/* Kolom Kiri: Teks & Informasi */}
          <div className="flex flex-col text-left lg:pr-10 mt-10 lg:mt-0 pointer-events-none">
            {/* Tag Available for work */}
            <motion.div variants={itemVariants} className="flex items-center space-x-2 text-gray-400 text-sm tracking-wider uppercase font-mono pointer-events-auto w-fit">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>Available for work</span>
            </motion.div>

            {/* Judul Besar */}
            <motion.div variants={itemVariants} className="flex flex-col mt-4 pointer-events-auto w-fit">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[0.9]">
                Frontend
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 leading-[1.1]">
                Developer
              </h1>
            </motion.div>

            {/* Animasi Text Bergantian */}
            <div className="mt-1 h-8 pointer-events-auto w-fit">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRoleIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <BlurText
                    text={roles[currentRoleIndex]}
                    delay={150}
                    stepDuration={0.8}
                    animateBy="words"
                    direction="top"
                    className="text-xl font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Deskripsi */}
            <motion.p variants={itemVariants} className="text-gray-400 max-w-lg text-lg leading-relaxed mt-2 pointer-events-auto">
              Menciptakan website modern dengan tampilan clean, responsif, dan elegan. Mengubah ide dan desain menjadi pengalaman digital yang menarik dan mudah digunakan.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8 pointer-events-auto w-full sm:w-fit">
              <a 
                href="/CV_IT%20Support(Muhammad%20Alief%20wardana).pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:scale-105 hover:bg-gray-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                Download CV
              </a>
              <a 
                href="#portfolio"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-full border border-gray-600 bg-gray-900/50 text-gray-300 font-semibold text-sm transition-all duration-300 hover:scale-105 hover:bg-gray-800 hover:border-gray-300 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
              >
                View Project
              </a>
            </motion.div>

            {/* Footer Links (explore & full-time) */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-2 mt-8 text-sm text-gray-500 font-mono pointer-events-auto w-fit">
              <p className="flex items-center hover:text-white transition-colors cursor-pointer w-fit">
                <span className="mr-2">↓</span> explore my work below
              </p>
              <p className="flex items-center hover:text-white transition-colors cursor-pointer w-fit">
                <span className="mr-2">↗</span> open to full-time & freelance opportunities
              </p>
            </motion.div>
          </div>


        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center z-20 pointer-events-none"
      >
        <span className="text-gray-500 font-mono text-xs tracking-widest uppercase mb-2">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
