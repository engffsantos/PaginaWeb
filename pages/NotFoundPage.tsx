import React from 'react';
import Link from '../components/Link';

const NotFoundPage: React.FC = () => (
  <div className="text-center py-40 container mx-auto px-4">
    <h1 className="text-4xl font-bold text-navy mb-4">404 - Página Não Encontrada</h1>
    <p className="text-lg text-gray-600 mb-8">A página que você está procurando não existe ou foi movida.</p>
    <Link href="/" className="bg-orange-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-hover transition-all duration-300">
      Voltar para a Home
    </Link>
  </div>
);

export default NotFoundPage;
