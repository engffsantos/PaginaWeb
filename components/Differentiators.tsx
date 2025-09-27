
import React from 'react';
import { SyncIcon, ShieldIcon, BrainIcon, RocketIcon, DevicesIcon, ChartIcon } from './icons';

const features = [
  { name: 'Integrações personalizadas', icon: <SyncIcon className="w-8 h-8" /> },
  { name: 'Segurança em primeiro lugar', icon: <ShieldIcon className="w-8 h-8" /> },
  { name: 'Equipe especializada', icon: <BrainIcon className="w-8 h-8" /> },
  { name: 'Entregas rápidas e escaláveis', icon: <RocketIcon className="w-8 h-8" /> },
  { name: 'Multiplataforma', icon: <DevicesIcon className="w-8 h-8" /> },
  { name: 'Dados e relatórios poderosos', icon: <ChartIcon className="w-8 h-8" /> },
];

const Differentiators: React.FC = () => {
  return (
    <section id="diferenciais" className="bg-light-gray py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy">Por que escolher a EasyData360?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg flex items-center space-x-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="text-cyan-vibrant flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy">{feature.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;