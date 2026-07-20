import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Certificates from '../components/sections/Certificates';
import Gallery from '../components/sections/Gallery';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <>
      <div className="relative z-50">
        <Navbar />
      </div>
      <main className="relative z-10 flex flex-col items-center w-full">
        <Hero />
        <About />
        <Projects />
        <Certificates />
        <Gallery />
        <Contact />
      </main>
    </>
  );
};

export default Home;
