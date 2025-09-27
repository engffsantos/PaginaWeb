import React from 'react';
import Link from '../components/Link';
import { solutions } from '../features/solutions/data';

const DemoPage: React.FC = () => (
    <div className="bg-off-white font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Info Section */}
                <div>
                    <h1 className="text-4xl font-extrabold text-navy">Agende uma Demonstração</h1>
                    <p className="mt-4 text-lg text-medium-gray">
                        Descubra na prática como as soluções EasyData360 podem otimizar seus processos, aumentar a eficiência e impulsionar seus resultados.
                    </p>
                    <p className="mt-4 text-medium-gray">
                        Preencha o formulário e nossa equipe entrará em contato para agendar uma apresentação personalizada, focada nos desafios do seu negócio.
                    </p>
                </div>

                {/* Form Section */}
                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-medium-gray">Nome Completo</label>
                            <input type="text" name="name" id="name" required className="mt-1 block w-full px-4 py-3 border border-light-gray rounded-md shadow-sm focus:ring-cyan-vibrant focus:border-cyan-vibrant" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-medium-gray">E-mail Corporativo</label>
                            <input type="email" name="email" id="email" required className="mt-1 block w-full px-4 py-3 border border-light-gray rounded-md shadow-sm focus:ring-cyan-vibrant focus:border-cyan-vibrant" />
                        </div>
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-medium-gray">Empresa</label>
                            <input type="text" name="company" id="company" className="mt-1 block w-full px-4 py-3 border border-light-gray rounded-md shadow-sm focus:ring-cyan-vibrant focus:border-cyan-vibrant" />
                        </div>
                         <div>
                            <label htmlFor="solution" className="block text-sm font-medium text-medium-gray">Produto de Interesse</label>
                            <select id="solution" name="solution" className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-light-gray focus:outline-none focus:ring-cyan-vibrant focus:border-cyan-vibrant sm:text-sm rounded-md">
                                <option>Geral</option>
                                {solutions.map(s => <option key={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-medium-gray">Mensagem (opcional)</label>
                            <textarea id="message" name="message" rows={3} className="mt-1 block w-full px-4 py-3 border border-light-gray rounded-md shadow-sm focus:ring-cyan-vibrant focus:border-cyan-vibrant"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-orange-primary hover:bg-orange-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-primary transition-all transform hover:scale-105">
                                Solicitar Demonstração
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
);

export default DemoPage;
