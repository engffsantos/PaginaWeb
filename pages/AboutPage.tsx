import React from 'react';
import Link from '../components/Link';
import { TargetIcon, EyeIcon, HeartIcon, UserGroupIcon, CheckCircleIcon } from '../components/icons';

const teamMembers = [
  { name: 'Carlos Silva', role: 'CEO & Lead Developer', image: 'https://picsum.photos/seed/carlos/300/300' },
  { name: 'Ana Pereira', role: 'CTO & Security Specialist', image: 'https://picsum.photos/seed/ana/300/300' },
  { name: 'Rafael Oliveira', role: 'Head of Product', image: 'https://picsum.photos/seed/rafael/300/300' },
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-off-white">
      {/* Hero Section */}
      <section className="relative bg-navy text-white py-20 lg:py-32 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/teamwork/1600/800')" }}>
        <div className="absolute inset-0 bg-navy opacity-70"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Inovação, tecnologia e soluções digitais completas
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            A EasyData360 é uma software house especializada em criar sistemas sob medida, consultoria em TI e serviços que transformam negócios em ambientes digitais ágeis e seguros.
          </p>
        </div>
      </section>

      {/* História e Propósito */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy">Nossa História e Propósito</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Fundada com o propósito de tornar a tecnologia acessível e estratégica, a EasyData360 nasceu da experiência prática em desenvolvimento de software, governança de TI e segurança da informação.
              <br/><br/>
              Nossa missão é <strong>transformar dados em resultados</strong>, criando soluções digitais inteligentes, escaláveis e confiáveis que realmente fazem a diferença no dia a dia dos nossos clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-20 lg:py-24 bg-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-cyan-vibrant/10 p-4 rounded-full mb-4"><TargetIcon className="w-10 h-10 text-cyan-vibrant" /></div>
              <h3 className="text-2xl font-bold text-navy mb-2">Missão</h3>
              <p className="text-gray-600">“Desenvolver soluções digitais que impulsionem empresas e pessoas com tecnologia segura e acessível.”</p>
            </div>
            <div className="flex flex-col items-center">
               <div className="bg-cyan-vibrant/10 p-4 rounded-full mb-4"><EyeIcon className="w-10 h-10 text-cyan-vibrant" /></div>
              <h3 className="text-2xl font-bold text-navy mb-2">Visão</h3>
              <p className="text-gray-600">“Ser referência nacional em software personalizado, combinando inovação, agilidade e confiabilidade.”</p>
            </div>
            <div className="flex flex-col items-center">
               <div className="bg-cyan-vibrant/10 p-4 rounded-full mb-4"><HeartIcon className="w-10 h-10 text-cyan-vibrant" /></div>
              <h3 className="text-2xl font-bold text-navy mb-2">Valores</h3>
              <p className="text-gray-600">Ética, inovação contínua, foco no cliente, segurança e qualidade, e trabalho em equipe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <UserGroupIcon className="w-16 h-16 text-cyan-vibrant mx-auto" />
            <h2 className="mt-4 text-3xl font-bold text-navy">Nossa Equipe</h2>
            <p className="mt-4 text-lg text-gray-600">
              A EasyData360 é feita por pessoas apaixonadas por tecnologia, que acreditam no poder dos dados e do software para transformar negócios.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map(member => (
              <div key={member.name} className="bg-light-gray rounded-lg p-6 text-center shadow-lg transform transition-transform duration-300 hover:scale-105">
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white" />
                <h4 className="text-xl font-bold text-navy">{member.name}</h4>
                <p className="text-cyan-vibrant">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 lg:py-24 bg-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Nossos Diferenciais</h2>
          <ul className="space-y-4">
            {[
              "Desenvolvimento com arquitetura moderna (Flask, React, APIs RESTful)",
              "Personalização sob demanda para empresas de diferentes portes",
              "Experiência em setores como indústria, educação, comércio e serviços",
              "Atendimento próximo e suporte contínuo",
              "Compromisso com segurança e conformidade (LGPD, ISO)"
            ].map((item, index) => (
              <li key={index} className="flex items-start bg-white p-4 rounded-lg shadow">
                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mr-4 mt-1" />
                <span className="text-lg text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Quer conhecer melhor nossas soluções?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href="/demo" className="bg-orange-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-hover transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Solicitar Demonstração
                </Link>
                <Link href="/#servicos" className="bg-transparent border-2 border-cyan-vibrant text-cyan-vibrant px-8 py-3 rounded-lg text-lg font-semibold hover:bg-cyan-vibrant hover:text-white transition-all duration-300">
                    Fale com a equipe
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
