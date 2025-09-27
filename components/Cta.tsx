import React from 'react';
import Link from './Link';

const Cta: React.FC = () => {
  return (
    <section id="cta" className="bg-navy relative overflow-hidden">
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-vibrant/10 rounded-full translate-x-1/2 translate-y-1/2"
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center relative z-10">
        <h3 className="text-3xl md:text-4xl font-extrabold text-white">
          Pronto para transformar sua operação com tecnologia?
        </h3>
        <div className="mt-8">
          <Link href="#" className="inline-block bg-orange-primary text-off-white px-10 py-4 rounded-lg text-xl font-bold hover:bg-orange-hover transition-all duration-300 transform hover:scale-105 shadow-2xl">
            Solicitar demonstração gratuita
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;