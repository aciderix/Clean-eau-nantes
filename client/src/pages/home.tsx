import React from 'react';
import WaterEffects from '@/components/WaterEffects';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import About from '@/components/About';
import Approach from '@/components/Approach';
import Events from '@/components/Events';
import Mission from '@/components/Mission';
import Activities from '@/components/Activities';
import Areas from '@/components/Areas';
import Partners from '@/components/Partners';
import Support from '@/components/Support';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <WaterEffects />
      <Navbar />
      <Header />
      <About />
      <Approach />
      <Events />
      <Mission />
      <Activities />
      <Areas />
      <Partners />
      <Support />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
