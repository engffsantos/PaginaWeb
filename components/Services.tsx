import React from 'react';
// FIX: Changed LockIcon to LockClosedIcon as LockIcon is not an exported member of ./icons
import { LockClosedIcon, CloudIcon, DataIcon, TrainingIcon } from './icons';
import Link from './Link';

const services = [
  { 
    name: 'Segurança da Informação', 
    // FIX: Changed LockIcon to LockClosedIcon
    icon: <LockClosedIcon className="w-8 h-8 text-red-500" />, 
    color: 'bg-red-100',
    description: 'Protegemos seus dados e sistemas contra ameaças, garantindo a continuidade do seu negócio.'
  },
  { 
    name: 'Cloud Computing & Infraestrutura', 
    icon: <CloudIcon className="w-8 h-8 text-blue-500" />, 
    color: 'bg-blue-100',
    description: 'Migramos e gerenciamos sua infraestrutura na nuvem para mais escalabilidade e eficiência.'
  },
  { 
    name: 'Consultoria em Dados & Processos', 
    icon: <DataIcon className="w-8 h-8 text-green-500" />, 
    color: 'bg-green-100',
    description: 'Transformamos seus dados brutos em insights valiosos para otimizar seus processos.'
  },
  { 
    name: 'Treinamentos personalizados', 
    icon: <TrainingIcon className="w-8 h-8 text-purple-500" />, 
    color: 'bg-purple-100',
    description: 'Capacitamos sua equipe para extrair o máximo de nossas ferramentas e tecnologias.'
  },
];

const Services: React.FC = () => {
  return (
    <section id="servicos" className="bg-off-white py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy">Consultoria, segurança e soluções que se adaptam a você</h2>
            <p className="mt-4 text-lg text-gray-600">
            Além dos nossos sistemas prontos, a EasyData360 oferece soluções digitais personalizadas, treinamentos e apoio estratégico para empresas em transformação digital.
            </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service) => (
            <div key={service.name} className="bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className={`flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full ${service.color}`}>
                  {service.icon}
                </div>
                <h3 className="ml-5 text-xl font-bold text-navy">{service.name}</h3>
              </div>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <Link href="/#cta" className="bg-orange-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-hover transition-all duration-300 transform hover:scale-105 shadow-lg">
                Fale com um consultor
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;