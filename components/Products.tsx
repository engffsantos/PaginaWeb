import React from 'react';
import { solutions } from '../solutions/data';
import Link from './Link';

const featuredProductIds = ['easy5s', 'easyrp', 'easystock360'];
const featuredProducts = solutions.filter(s => featuredProductIds.includes(s.id));

interface ProductCardProps {
    name: string;
    Icon: React.FC<{className?: string}>;
    description: string;
    link: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, Icon, description, link }) => (
    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-b-4 hover:border-cyan-vibrant">
        <div className="text-cyan-vibrant mb-4">
            <Icon className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-navy mb-3">{name}</h3>
        <p className="text-gray-600 flex-grow mb-6">{description}</p>
        <Link href={link} className="mt-auto text-cyan-vibrant font-semibold hover:text-navy transition-colors">
            Saiba mais &rarr;
        </Link>
    </div>
);

const Products: React.FC = () => {
  return (
    <section id="produtos" className="bg-light-gray py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy">Softwares que transformam sua operação</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
                <ProductCard 
                    key={product.id}
                    name={product.name}
                    Icon={product.Icon}
                    description={product.shortDescription}
                    link={`/solutions/${product.id}`}
                />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Products;