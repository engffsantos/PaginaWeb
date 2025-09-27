import React from 'react';
import { CaseStudy } from '../features/cases/data';
import NotFoundPage from './NotFoundPage';
import Link from '../components/Link';

interface CaseDetailPageProps {
  caseStudy?: CaseStudy;
}

const CaseDetailPage: React.FC<CaseDetailPageProps> = ({ caseStudy }) => {
  if (!caseStudy) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-white font-sans">
      {/* Hero */}
      <section className="relative py-20 lg:py-32 bg-navy text-white">
        <img src={caseStudy.coverImage} alt={caseStudy.title} className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-lg font-semibold text-cyan-vibrant">{caseStudy.client} | {caseStudy.industry}</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold">{caseStudy.title}</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">O Desafio</h2>
              <p className="text-lg text-medium-gray leading-relaxed">{caseStudy.challenge}</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy mb-4">A Solução EasyData360</h2>
              <p className="text-lg text-medium-gray leading-relaxed">{caseStudy.solution}</p>
            </div>
          </div>

          {/* Sidebar with Results */}
          <aside className="lg:col-span-1">
            <div className="bg-light-gray p-8 rounded-lg sticky top-28">
              <h3 className="text-2xl font-bold text-navy mb-6">Resultados Alcançados</h3>
              <div className="space-y-6">
                {caseStudy.results.map(result => (
                  <div key={result.description}>
                    <p className="text-4xl font-extrabold text-cyan-vibrant">{result.value}</p>
                    <p className="text-medium-gray mt-1">{result.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Testimonial */}
        <div className="mt-20 lg:mt-24 max-w-4xl mx-auto text-center bg-navy text-white p-10 rounded-xl shadow-2xl relative">
           <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-cyan-vibrant/20 text-9xl font-serif">“</div>
          <p className="text-2xl italic relative z-10">"{caseStudy.testimonial.quote}"</p>
          <p className="mt-6 font-bold text-lg">{caseStudy.testimonial.author}</p>
          <p className="text-cyan-vibrant">{caseStudy.testimonial.role}</p>
        </div>
      </div>
       {/* CTA */}
      <section className="bg-off-white py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-navy">Pronto para alcançar resultados semelhantes?</h2>
            <p className="mt-4 text-lg text-medium-gray max-w-2xl mx-auto">Veja como nossas soluções podem ser adaptadas para os desafios da sua empresa.</p>
            <div className="mt-8">
                <Link href="/demo" className="bg-orange-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-hover transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Agende uma Demonstração
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default CaseDetailPage;
