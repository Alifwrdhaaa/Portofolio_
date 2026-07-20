import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Particles from './components/ui/Particles';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30 relative">
        {/* Fixed Background Animasi untuk seluruh konten */}
        <div className="fixed inset-0 z-0 pointer-events-auto">
          <Particles
            particleColors={["#ffffff", "#818cf8", "#c084fc"]}
            particleCount={400}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
            pixelRatio={1}
            className="opacity-40" // Tambahkan opacity agar tidak terlalu menutupi konten
          />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
