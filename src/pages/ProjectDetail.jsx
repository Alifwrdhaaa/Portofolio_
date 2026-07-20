import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white relative z-10">
        <h1 className="text-3xl font-bold mb-6">Project Not Found</h1>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-indigo-600 rounded-lg text-white font-medium hover:bg-indigo-700 transition-colors">
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full min-h-screen pt-12 pb-24 text-gray-300">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Tombol Back */}
        <button 
          onClick={() => navigate('/')}
          className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-10 w-fit"
        >
          <svg className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Kolom Kiri */}
          <div className="flex flex-col">
            <h1 className="text-5xl lg:text-[4rem] font-bold text-white mb-8 leading-tight tracking-tight">
              {project.title}
            </h1>
            
            <div className="w-16 h-px bg-gray-700 mb-8"></div>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-12 text-justify">
              {project.description}
            </p>

            {/* Stats Boxes */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex-1 flex items-center p-5 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">{project.techStack.length}</h4>
                  <p className="text-xs text-gray-500">Technologies Used</p>
                </div>
              </div>
              <div className="flex-1 flex items-center p-5 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">{project.keyFeatures?.length || 0}</h4>
                  <p className="text-xs text-gray-500">Key Features</p>
                </div>
              </div>
            </div>

            {/* Link Buttons */}
            {( (project.liveLink && project.liveLink !== '#') || (project.githubLink && project.githubLink !== '#') ) && (
              <div className="flex flex-wrap gap-4 mb-16">
                {project.liveLink && project.liveLink !== '#' && (
                  <a 
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Visit Live</span>
                  </a>
                )}
                
                {project.githubLink && project.githubLink !== '#' && (
                  <a 
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            )}

            {/* Technologies Used Section */}
            <div>
              <h4 className="text-sm font-mono text-gray-400 mb-6 flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 font-medium flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2"></span>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="flex flex-col">
            {/* Main Image Clickable */}
            <div 
              className="w-full bg-white/5 border border-white/10 rounded-3xl p-2 mb-8 cursor-pointer group relative"
              onClick={() => setSelectedImage(project.image)}
            >
              <div className="w-full h-64 md:h-[400px] rounded-2xl overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-4 bg-black/50 backdrop-blur-md rounded-full border border-white/20">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features Box */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-8">
                <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Key Features
                </h4>
                <ul className="space-y-4">
                  {project.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 mr-4 flex-shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
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
              alt="Project Full Preview"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
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
    </div>
  );
};

export default ProjectDetail;
