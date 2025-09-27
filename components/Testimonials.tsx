import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

const testimonialsData = [
  {
    quote: "Com a EasyData360 conseguimos implantar o sistema de 5S em todas as unidades em menos de 2 semanas.",
    author: "Júlia Pereira",
    title: "Coordenadora de Qualidade - Indústria XYZ",
    image: "https://picsum.photos/100/100?random=1",
  },
  {
    quote: "Nosso estoque estava um caos. Com o EasyStock, temos total controle e previsibilidade.",
    author: "Marcos Lima",
    title: "Gerente de Logística - Comércio Alpha",
    image: "https://picsum.photos/100/100?random=2",
  },
  {
    quote: "A consultoria de dados transformou nossa tomada de decisão. Agora, tudo é baseado em métricas reais.",
    author: "Ana Souza",
    title: "Diretora de Marketing - Startup Beta",
    image: "https://picsum.photos/100/100?random=3",
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  };
  
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <section id="depoimentos" className="bg-off-white py-20 lg:py-24 relative overflow-hidden">
        <div 
            aria-hidden="true" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-light-gray"
            style={{ fontSize: '20rem', userSelect: 'none', zIndex: 0, lineHeight: 1 }}
        >
            ”
        </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
           <h2 className="text-3xl md:text-4xl font-extrabold text-navy">O que nossos clientes dizem</h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden relative h-64">
             <div 
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {testimonialsData.map((testimonial) => (
                    <div key={testimonial.author} className="w-full flex-shrink-0 h-full">
                        <div className="flex flex-col items-center justify-center h-full text-center px-4">
                            <p className="text-xl italic text-gray-700 max-w-2xl">“{testimonial.quote}”</p>
                            <div className="mt-6 flex items-center">
                                <img className="w-12 h-12 rounded-full object-cover" src={testimonial.image} alt={testimonial.author} />
                                <div className="ml-4 text-left">
                                <p className="font-bold text-navy">{testimonial.author}</p>
                                <p className="text-sm text-gray-500">{testimonial.title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
          
          <button onClick={prevSlide} className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-light-gray transition z-20">
            <ChevronLeftIcon className="w-6 h-6 text-navy" />
          </button>
          <button onClick={nextSlide} className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-light-gray transition z-20">
            <ChevronRightIcon className="w-6 h-6 text-navy" />
          </button>

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
            {testimonialsData.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-cyan-vibrant' : 'bg-gray-300 hover:bg-gray-400'}`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;