import React from 'react';
import Link from './Link';

const Hero: React.FC = () => {
  return (
    <section 
      id="inicio"
      className="bg-gradient-to-br from-off-white to-light-gray/60 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy leading-tight tracking-tight opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              Soluções digitais sob medida para <span className="text-cyan-vibrant">empresas inteligentes.</span>
            </h1>
            <p 
              className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <strong className="font-semibold text-navy">EasyData360</strong> é uma software house especializada em criar sistemas completos, integrados e prontos para escalar com seu negócio.
            </p>
            <div 
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
            >
              <Link href="/#cta" className="bg-orange-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-hover transition-all duration-300 transform hover:scale-105 shadow-lg">
                Solicitar demonstração
              </Link>
              <Link href="/solutions" className="bg-transparent border-2 border-cyan-vibrant text-cyan-vibrant px-8 py-3 rounded-lg text-lg font-semibold hover:bg-cyan-vibrant hover:text-white transition-all duration-300 transform hover:scale-105">
                Ver nossos produtos
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center items-center h-full opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="relative w-[80%] max-w-lg lg:w-full">
              {/* Laptop Mockup */}
              <div className="relative aspect-[16/10] bg-gray-800 rounded-t-xl border-4 border-gray-800 shadow-2xl">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-600"></div>
                <img src="https://picsum.photos/id/42/800/500" alt="Dashboard de análise de dados em um laptop" className="w-full h-full object-cover rounded-t-lg"/>
              </div>
              <div className="h-4 bg-gray-300 rounded-b-xl relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1 bg-gray-400/50 rounded-full"></div>
              </div>

              {/* Phone Mockup */}
              <div className="absolute -bottom-10 -right-10 md:-right-16 w-36 h-auto bg-gray-700 rounded-2xl border-2 border-gray-700 p-2 shadow-2xl transform rotate-6">
                 <div className="bg-gray-800 w-full h-full rounded-lg overflow-hidden">
                   <img src="https://picsum.photos/id/99/200/400" alt="Visão mobile de um sistema de gestão" className="w-full h-full object-cover"/>
                 </div>
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-10 bg-gray-700 rounded-b-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;