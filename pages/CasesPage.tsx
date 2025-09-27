import React from 'react';
import Link from '../components/Link';
import { cases } from '../features/cases/data';

const CasesPage: React.FC = () => {
  return (
    <div className="bg-off-white font-sans">
      {/* Hero */}
      <section className="bg-navy text-white py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">Casos de Sucesso</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Histórias reais de clientes que transformaram seus processos com as soluções EasyData360.
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {cases.map((caseStudy) => (
              <Link href={`/cases/${caseStudy.slug}`} key={caseStudy.id} className="block bg-white rounded-lg shadow-lg overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2">
                <div className="relative">
                  <img src={caseStudy.coverImage} alt={caseStudy.title} className="w-full h-56 object-cover" />
                  <div className="absolute inset-0 bg-graphite-black/30 group-hover:bg-graphite-black/50 transition-colors"></div>
                  <div className="absolute bottom-4 left-4">
                      <span className="bg-cyan-vibrant text-white text-sm font-semibold px-3 py-1 rounded-full">{caseStudy.industry}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-semibold text-medium-gray">{caseStudy.client}</p>
                  <h3 className="mt-2 text-xl font-bold text-navy group-hover:text-cyan-vibrant transition-colors">{caseStudy.title}</h3>
                  <span className="mt-4 inline-block text-orange-primary font-semibold">
                    Ver projeto &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CasesPage;
