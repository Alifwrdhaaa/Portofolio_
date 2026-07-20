import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SpotlightCard from '../ui/SpotlightCard';
import { projects } from '../../data/projects';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('Website');
  const tabs = ['Website', 'UI/UX Design', 'Wordpress', 'Looker Studio', 'Power BI'];

  const filteredProjects = projects.filter(p => p.category === activeTab);

  return (
    <section id="portfolio" className="w-full max-w-[1450px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16 lg:py-24 text-white relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-3 leading-[1.1]">Portfolio Showcase</h2>
        <p className="text-white/55 max-w-xl mx-auto text-lg leading-relaxed">
          Koleksi proyek pilihan yang pernah saya kerjakan berdasarkan berbagai keahlian dan platform.
        </p>
      </motion.div>

      {/* Tabs Filter */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16 border border-white/10 rounded-3xl md:rounded-full p-2 w-full max-w-max mx-auto bg-white/5 backdrop-blur-sm shadow-xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 md:px-8 md:py-3 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === tab
                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                : 'text-white/50 hover:text-white hover:bg-white/10'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4 }}
                key={project.id}
              >
                <SpotlightCard className="h-[480px] flex flex-col p-6 group">
                  <div className="w-full h-52 rounded-2xl overflow-hidden mb-6 flex-shrink-0 relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/60 border border-white/20 rounded-full text-xs font-mono backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 line-clamp-1">{project.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-auto leading-relaxed">
                    {project.description}
                  </p>

                  <Link
                    to={`/project/${project.id}`}
                    className="mt-6 w-full flex items-center justify-center space-x-2 py-3 rounded-xl border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold text-sm group/btn"
                  >
                    <span>Detail Proyek</span>
                    <svg className="w-4 h-4 transform transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </SpotlightCard>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full flex flex-col items-center justify-center py-20 text-white/40"
            >
              <div className="text-6xl mb-4 opacity-50">🚧</div>
              <p className="text-lg font-mono">Belum ada proyek di kategori ini.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;
