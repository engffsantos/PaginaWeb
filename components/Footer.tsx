import React from 'react';
import Link from './Link';
import { solutions } from '../features/solutions/data';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Logo & Social */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold tracking-wider">
              EasyData<span className="text-cyan-vibrant">360</span>
            </h3>
            <p className="mt-4 text-gray-400">Transformando dados em resultados com soluções digitais inteligentes.</p>
             <div className="mt-6 flex space-x-4">
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg></a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" clipRule="evenodd" /></svg></a>
              <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-white transition"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/></svg></a>
            </div>
          </div>

          {/* Col 2: Institucional */}
          <div>
            <h4 className="font-semibold text-lg mb-4 tracking-wider text-white">Institucional</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">Sobre</Link></li>
              <li><Link href="/cases" className="text-gray-400 hover:text-white transition">Cases de Sucesso</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Termos de Uso</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Política de Privacidade</Link></li>
            </ul>
          </div>

          {/* Col 3: Soluções */}
          <div>
            <h4 className="font-semibold text-lg mb-4 tracking-wider text-white">Soluções</h4>
            <ul className="space-y-3">
              {solutions.slice(0, 5).map(s => (
                 <li key={s.id}><Link href={`/solutions/${s.id}`} className="text-gray-400 hover:text-white transition">{s.name}</Link></li>
              ))}
              <li><Link href="/solutions" className="text-cyan-vibrant font-semibold hover:text-white transition">Ver todas &rarr;</Link></li>
            </ul>
          </div>
          
          {/* Col 4: Contato */}
          <div>
            <h4 className="font-semibold text-lg mb-4 tracking-wider text-white">Contato</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="mailto:contato@easydata360.com.br" className="hover:text-white transition">contato@easydata360.com.br</a></li>
              <li><a href="#" className="hover:text-white transition">WhatsApp: (11) 99999-9999</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} EasyData360. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;