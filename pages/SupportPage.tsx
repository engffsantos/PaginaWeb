import React from 'react';
import Link from '../components/Link';

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => (
    <details className="group border-b border-light-gray py-4">
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

const SupportPage: React.FC = () => (
    <div className="bg-off-white font-sans">
        {/* Hero */}
        <section className="bg-white py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-navy">Central de Suporte</h1>
                <p className="mt-4 text-lg text-medium-gray max-w-3xl mx-auto">
                    Precisa de ajuda? Encontre respostas rápidas aqui ou entre em contato com nossa equipe.
                </p>
            </div>
        </section>

        {/* Content */}
        <section className="py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* FAQ */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-navy mb-8">Perguntas Frequentes</h2>
                        <div className="space-y-2">
                            <FaqItem question="Como acesso o meu sistema?">
                                <p>Você pode acessar seu sistema através do <Link href="/login" className="text-cyan-vibrant font-semibold underline">Portal do Cliente</Link>. Use o e-mail e a senha fornecidos durante a implantação. Caso tenha esquecido a senha, utilize a opção "Esqueci minha senha" na página de login.</p>
                            </FaqItem>
                            <FaqItem question="Qual o horário de atendimento do suporte?">
                                <p>Nosso suporte técnico padrão atende de segunda a sexta-feira, das 8h às 18h (horário de Brasília). Clientes com contratos de suporte estendido (24/7) têm acesso a canais de emergência.</p>
                            </FaqItem>
                            <FaqItem question="Como solicitar um novo recurso ou personalização?">
                                <p>Novas funcionalidades ou personalizações podem ser solicitadas diretamente ao seu gerente de conta ou através do nosso e-mail de contato. Nossa equipe analisará a viabilidade e enviará uma proposta comercial.</p>
                            </FaqItem>
                            <FaqItem question="Os sistemas recebem atualizações?">
                                <p>Sim. Nossos sistemas estão em constante evolução. As atualizações de segurança e melhorias de performance são aplicadas automaticamente. Novas funcionalidades são comunicadas e disponibilizadas periodicamente.</p>
                            </FaqItem>
                        </div>
                    </div>

                    {/* Contact */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-lg shadow-lg sticky top-28">
                            <h3 className="text-2xl font-bold text-navy mb-6">Fale Conosco</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-medium-gray">Suporte Técnico</h4>
                                    <a href="mailto:suporte@easydata360.com.br" className="text-cyan-vibrant text-lg font-semibold hover:underline">suporte@easydata360.com.br</a>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-medium-gray">WhatsApp</h4>
                                    <a href="#" className="text-cyan-vibrant text-lg font-semibold hover:underline">(11) 99999-9999</a>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-medium-gray">Comercial</h4>
                                     <a href="mailto:contato@easydata360.com.br" className="text-cyan-vibrant text-lg font-semibold hover:underline">contato@easydata360.com.br</a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    </div>
);

export default SupportPage;
