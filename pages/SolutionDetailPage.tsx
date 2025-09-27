import React from 'react';
import type { Solution } from '../features/solutions/data';
import { CheckCircleIcon } from '../components/icons';
import Link from '../components/Link';

interface SolutionDetailPageProps {
  solution: Solution;
}

const SolutionDetailPage: React.FC<SolutionDetailPageProps> = ({ solution }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-light-gray py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <solution.Icon className="w-16 h-16 text-cyan-vibrant" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy">{solution.name}</h1>
          <p className="mt-4 text-2xl text-gray-700 font-light max-w-3xl mx-auto">
            {solution.tagline}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column: Description */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-navy mb-4">Descrição Detalhada</h2>
              <div className="text-lg text-gray-600 leading-relaxed whitespace-pre-line prose max-w-none">
                {solution.description}
              </div>

              <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Imagens do Sistema</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <img src={`https://picsum.photos/seed/${solution.id}1/800/600`} alt={`${solution.name} - Tela 1`} className="rounded-lg shadow-lg w-full h-auto object-cover border" />
                <img src={`https://picsum.photos/seed/${solution.id}2/800/600`} alt={`${solution.name} - Tela 2`} className="rounded-lg shadow-lg w-full h-auto object-cover border" />
              </div>

              <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Principais Funcionalidades</h2>
              <ul className="space-y-4">
                {solution.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mr-3 mt-1" />
                    <span className="text-lg text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Tech & Meta */}
            <div className="lg:col-span-1">
              <div className="bg-light-gray p-8 rounded-lg sticky top-28">
                <h3 className="text-xl font-bold text-navy mb-4">Tecnologias Utilizadas</h3>
                <div className="flex flex-wrap gap-2">
                  {solution.tech.map((tech, index) => (
                    <span key={index} className="bg-cyan-vibrant/10 text-cyan-vibrant text-sm font-semibold px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                {solution.useCases && solution.useCases.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold text-navy mt-8 mb-4">Casos de Uso</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {solution.useCases.map((useCase, index) => (
                        <li key={index}>{useCase}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Quer ver o sistema funcionando?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">Agende uma demonstração gratuita com nosso time e veja como nossas soluções se adaptam ao seu negócio.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#" className="bg-orange-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-hover transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Solicitar Demonstração
                </Link>
                <Link href="#" className="bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-600 transition-all duration-300">
                    Entrar no sistema
                </Link>
            </div>
        </div>
    </section>

    </div>
  );
};

export default SolutionDetailPage;