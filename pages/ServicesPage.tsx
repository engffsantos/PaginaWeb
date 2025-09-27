import React from 'react';
import Link from '../components/Link';
import { BrainIcon, ShieldIcon, ClipboardListIcon, CloudIcon, TrainingIcon, GearIcon, CheckCircleIcon } from '../components/icons';

const services = [
    {
        id: "consultoria",
        Icon: BrainIcon,
        title: "Consultoria e Soluções Personalizadas",
        subtitle: "Tecnologia sob medida para os seus desafios",
        description: "Cada empresa tem necessidades únicas. Desenvolvemos e adaptamos soluções digitais com base no seu contexto, fluxo de trabalho e metas. Desde automações simples até sistemas completos e integrados.",
        included: [
            "Desenvolvimento sob demanda (sistemas internos, APIs, ferramentas internas)",
            "Automatização de processos (integrações, dashboards, robôs)",
            "Projetos com escopo técnico e cronograma detalhado",
            "Soluções baseadas em dados (Data Analytics, BI)",
            "Personalização dos produtos EasyData360 para contextos específicos",
        ],
        highlights: ["Arquitetura escalável", "Entregas ágeis e modulares", "Suporte pós-implantação"],
        bgColor: "bg-white"
    },
    {
        id: "seguranca",
        Icon: ShieldIcon,
        title: "Segurança da Informação",
        subtitle: "Proteja dados, evite falhas e esteja em conformidade",
        description: "Atuamos em todos os níveis da segurança digital, desde diagnósticos e políticas até soluções técnicas e resposta a incidentes.",
        included: [
            "Auditoria de segurança",
            "Mapeamento de riscos e vulnerabilidades",
            "Implementação de políticas de segurança da informação",
            "Conformidade com LGPD e boas práticas internacionais (ISO 27001, NIST)",
            "Treinamento para equipes (boas práticas de uso de sistemas e senhas)",
            "Soluções de backup e recuperação",
        ],
        highlights: ["Proteção de dados sensíveis", "Redução de riscos operacionais", "Adequação legal e regulatória"],
        bgColor: "bg-light-gray"
    },
    {
        id: "governanca",
        Icon: ClipboardListIcon,
        title: "Governança de TI",
        subtitle: "Estruture a tecnologia para dar suporte ao negócio com eficiência",
        description: "Auxiliamos empresas na construção de uma TI sólida, alinhada com os objetivos organizacionais e preparada para sustentar o crescimento.",
        included: [
            "Mapeamento de processos e ferramentas",
            "Planejamento estratégico de TI",
            "Indicadores e KPIs de tecnologia",
            "Diagnóstico de maturidade tecnológica",
            "Criação de políticas de uso e controle de recursos",
        ],
        highlights: ["Visão clara da TI como apoio à estratégia", "Eficiência no uso de recursos tecnológicos", "Melhoria contínua e governança ágil"],
        bgColor: "bg-white"
    },
    {
        id: "cloud",
        Icon: CloudIcon,
        title: "Cloud Computing e Infraestrutura",
        subtitle: "Infraestrutura segura, flexível e sob medida",
        description: "Migramos, otimizamos e mantemos ambientes em nuvem com foco em performance, segurança e escalabilidade.",
        included: [
            "Migração de sistemas para nuvem (AWS, Google Cloud, Azure ou VPS própria)",
            "Configuração de servidores (EC2, VPS, Docker)",
            "Infraestrutura de VPN entre unidades (ex: WireGuard)",
            "Monitoramento e automação de backups",
            "Otimização de performance e uso de recursos",
        ],
        highlights: ["Redução de custos com infraestrutura física", "Maior disponibilidade e acessibilidade dos sistemas", "Suporte técnico para arquitetura cloud-native"],
        bgColor: "bg-light-gray"
    },
    {
        id: "treinamentos",
        Icon: TrainingIcon,
        title: "Treinamentos Profissionais",
        subtitle: "Capacite sua equipe para a era digital",
        description: "Oferecemos treinamentos técnicos e estratégicos personalizados para sua equipe. Nossos conteúdos são voltados à prática e à realidade da sua empresa.",
        included: [
            "Cursos técnicos (TI, segurança, dados, automação)",
            "Treinamentos em software (inclusive os da EasyData360)",
            "Oficinas e workshops presenciais ou remotos",
            "Trilhas de formação para líderes, gestores e operadores",
        ],
        highlights: ["Didática clara e orientada a resultados", "Apostilas e certificados", "Treinamento in company ou remoto"],
        bgColor: "bg-white"
    },
    {
        id: "suporte",
        Icon: GearIcon,
        title: "Suporte Técnico e Implantação",
        subtitle: "Acompanhamento próximo e suporte real para sua equipe",
        description: "Desde a implantação de sistemas até o suporte técnico contínuo, nossa equipe está disponível para garantir que tudo funcione com fluidez.",
        included: [
            "Implantação guiada de sistemas EasyData360",
            "Treinamento inicial e suporte ao uso",
            "Canal direto de suporte via WhatsApp ou Helpdesk",
            "Atualizações, migrações e correções",
            "Monitoramento e diagnóstico remoto",
        ],
        highlights: ["Equipe técnica com acesso rápido", "SLA de atendimento personalizado", "Suporte contínuo, mesmo após a entrega"],
        bgColor: "bg-light-gray"
    },
];

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => (
    <details className="group border-b border-gray-200 py-4">
        <summary className="flex justify-between items-center cursor-pointer list-none">
            <span className="font-semibold text-lg text-navy">{question}</span>
            <span className="transition-transform duration-300 transform group-open:rotate-180">
                <svg className="w-6 h-6 text-cyan-vibrant" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
        </summary>
        <div className="mt-4 text-medium-gray prose max-w-none">
            {children}
        </div>
    </details>
);

const ServicesPage: React.FC = () => {
    return (
        <div className="bg-off-white font-sans">
            {/* Hero Section */}
            <section className="bg-white py-20 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-navy">
                        Soluções técnicas e estratégicas para o crescimento digital da sua empresa
                    </h1>
                    <p className="mt-6 text-lg text-medium-gray max-w-3xl mx-auto">
                        Mais do que desenvolver software, a EasyData360 oferece serviços completos para digitalizar, proteger, otimizar e escalar seus processos. Atuamos como parceiro estratégico de empresas que desejam tecnologia sob medida, segurança da informação e equipes capacitadas.
                    </p>
                </div>
            </section>

            {/* Services Sections */}
            {services.map(service => (
                <section key={service.id} id={service.id} className={`${service.bgColor} py-20 lg:py-24`}>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-3 gap-12 items-center">
                            <div className="lg:col-span-1 text-center lg:text-left">
                                <service.Icon className="w-16 h-16 text-cyan-vibrant mx-auto lg:mx-0" />
                                <h2 className="mt-4 text-3xl font-bold text-navy">{service.title}</h2>
                                <h3 className="mt-2 text-xl text-graphite-black font-light">{service.subtitle}</h3>
                            </div>
                            <div className="lg:col-span-2">
                                <p className="text-lg text-medium-gray mb-8">{service.description}</p>
                                <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                                    <div>
                                        <h4 className="font-bold text-navy mb-4 text-lg">Serviços incluídos:</h4>
                                        <ul className="space-y-3">
                                            {service.included.map((item, index) => (
                                                <li key={index} className="flex items-start">
                                                    <CheckCircleIcon className="w-5 h-5 text-emerald-soft flex-shrink-0 mr-3 mt-1" />
                                                    <span className="text-medium-gray">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy mb-4 text-lg">Destaques:</h4>
                                        <div className="space-y-3">
                                            {service.highlights.map((highlight, index) => (
                                                 <div key={index} className="bg-cyan-vibrant/10 text-cyan-vibrant p-3 rounded-lg font-semibold text-sm">
                                                    {highlight}
                                                 </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* FAQ Section */}
            <section id="faq" className="bg-white py-20 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-navy text-center mb-12">Perguntas Frequentes (FAQ)</h2>
                        <div className="space-y-2">
                            <FaqItem question="Posso contratar serviços separadamente dos softwares?">
                                <p>Sim! Todos os serviços são oferecidos de forma independente ou integrada aos nossos produtos. Você pode contratar uma consultoria de segurança, por exemplo, mesmo sem utilizar nossos sistemas.</p>
                            </FaqItem>
                            <FaqItem question="A EasyData360 atua em empresas de qualquer setor?">
                                <p>Sim. Nossa expertise em tecnologia e processos nos permite adaptar nossas soluções para diferentes realidades de negócio. Temos experiência com indústria, saúde, educação, comércio e setor público.</p>
                            </FaqItem>
                            <FaqItem question="É possível contratar horas técnicas por demanda?">
                                <p>Sim. Oferecemos pacotes de horas avulsas para necessidades pontuais ou contratos de suporte contínuo com SLA definido, de acordo com o que for melhor para sua operação.</p>
                            </FaqItem>
                            <FaqItem question="Vocês emitem nota fiscal e formalizam tudo?">
                                <p>Sim. Prezamos pela transparência e profissionalismo. Todos os serviços são formalizados com contrato, escopo detalhado, cronograma de entregas e emissão de Nota Fiscal de Serviço (NF-e).</p>
                            </FaqItem>
                        </div>
                    </div>
                </div>
            </section>

             {/* Final CTA Section */}
            <section className="bg-navy">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Quer entender qual serviço é ideal para sua empresa?</h2>
                    <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">Agende uma conversa com nosso time e receba um diagnóstico gratuito para identificar os melhores caminhos tecnológicos para o seu negócio.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/demo" className="bg-orange-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-hover transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Agendar reunião técnica
                        </Link>
                        <Link href="/solutions" className="bg-transparent border-2 border-cyan-vibrant text-cyan-vibrant px-8 py-3 rounded-lg text-lg font-semibold hover:bg-cyan-vibrant hover:text-white transition-all duration-300">
                            Ver soluções prontas
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;