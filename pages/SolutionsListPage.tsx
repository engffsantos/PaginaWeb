import React from 'react';
import { solutions } from '../features/solutions/data';
import Link from '../components/Link';

const SolutionsListPage: React.FC = () => {
  return (
    <div className="bg-off-white">
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-navy">
              Soluções Digitais EasyData360
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Criamos sistemas completos, personalizáveis e com tecnologia de ponta para transformar dados, processos e ambientes em resultados reais. Conheça todas as soluções desenvolvidas pela EasyData360 e escolha a que melhor se adapta ao seu negócio.
            </p>
          </div>
        </div>
      </section>
      
      <section className="pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <Link 
                key={solution.id} 
                href={`/solutions/${solution.id}`}
                className="block bg-white rounded-lg shadow-lg p-8 flex flex-col text-left transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-b-4 hover:border-cyan-vibrant group"
              >
                <div className="flex-shrink-0 text-cyan-vibrant mb-4">
                  <solution.Icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-3 group-hover:text-cyan-vibrant transition-colors">{solution.name}</h3>
                <p className="text-gray-600 flex-grow mb-6">{solution.shortDescription}</p>
                <span className="mt-auto text-cyan-vibrant font-semibold">
                  Saiba mais &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsListPage;