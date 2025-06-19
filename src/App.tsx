import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Exercises from './components/Exercises';
import DietPlans from './components/DietPlans';
import Programs from './components/Programs';
import Tools from './components/Tools';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Exercises />
      <DietPlans />
      <Programs />
      <Tools />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;