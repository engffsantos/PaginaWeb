import React from 'react';
import Hero from '../features/home/Hero';
import Products from '../features/home/Products';
import Services from '../features/home/Services';
import Differentiators from '../features/home/Differentiators';
import Testimonials from '../features/home/Testimonials';
import Cta from '../features/home/Cta';
import Blog from '../features/home/Blog';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Products />
      <Services />
      <Differentiators />
      <Testimonials />
      <Cta />
      <Blog />
    </>
  );
};

export default HomePage;