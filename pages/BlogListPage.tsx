import React, { useState, useMemo } from 'react';
import Link from '../components/Link';
import { posts, Post } from '../features/blog/data';
import { SearchIcon } from '../components/icons';

const categories = [
    'Desenvolvimento', 
    'Segurança da Informação', 
    'Dados e Analytics', 
    'Gestão e Estratégia', 
    'Produtos EasyData360'
];

const POSTS_PER_PAGE = 6;

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative">
          <img src={post.cover_image} alt={post.title} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
        </div>
        <div className="p-6 flex flex-col">
          <p className="text-sm font-semibold text-cyan-vibrant uppercase tracking-wider">{post.category}</p>
          <h3 className="mt-2 text-xl font-semibold text-navy group-hover:text-cyan-vibrant transition-colors h-20">{post.title}</h3>
          <p className="text-medium-gray mt-2 text-sm flex-grow">{post.summary}</p>
          <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
              <span>{new Date(post.created_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="font-semibold text-cyan-vibrant opacity-0 group-hover:opacity-100 transition-opacity">
                Leia mais &rarr;
              </span>
          </div>
        </div>
      </Link>
    </div>
);


const BlogListPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredPosts = useMemo(() => {
        return posts
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .filter(post => 
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.summary.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter(post => 
                selectedCategory ? post.category === selectedCategory : true
            );
    }, [searchTerm, selectedCategory]);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    
    return (
        <div className="bg-off-white font-sans">
            {/* Hero Section */}
            <section className="bg-white py-20 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-navy">
                                Explore o futuro digital com a EasyData360
                            </h1>
                            <p className="mt-4 text-lg text-medium-gray">
                                Aprenda, se inspire e fique por dentro das soluções mais inteligentes para sua empresa.
                            </p>
                        </div>
                        <div>
                             <img src="https://picsum.photos/seed/bloghero/600/400" alt="Ilustração de dados e tecnologia" className="rounded-lg shadow-xl mx-auto" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter and Search Section */}
            <section className="py-8 bg-light-gray sticky top-16 md:top-20 z-30 border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Buscar por palavra-chave..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border-gray-300 focus:ring-cyan-vibrant focus:border-cyan-vibrant transition"
                            />
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        <div className="relative">
                            <select
                                value={selectedCategory || ''}
                                onChange={(e) => { setSelectedCategory(e.target.value || null); setCurrentPage(1); }}
                                className="w-full md:w-64 px-4 py-3 rounded-lg border-gray-300 focus:ring-cyan-vibrant focus:border-cyan-vibrant transition appearance-none"
                            >
                                <option value="">Todas as categorias</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles List */}
            <section className="py-20 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {paginatedPosts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {paginatedPosts.map(post => <PostCard key={post.id} post={post} />)}
                            </div>
                            {totalPages > 1 && (
                                <div className="mt-16 flex justify-center items-center gap-4">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 bg-white border border-light-gray rounded-md text-medium-gray hover:bg-light-gray disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        &larr; Anteriores
                                    </button>
                                    <span className="text-medium-gray">
                                        Página {currentPage} de {totalPages}
                                    </span>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 bg-white border border-light-gray rounded-md text-medium-gray hover:bg-light-gray disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        Próximos &rarr;
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <h2 className="text-2xl font-bold text-navy">Nenhum artigo encontrado</h2>
                            <p className="text-medium-gray mt-2">Tente ajustar seus filtros ou termo de busca.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="bg-light-gray py-16">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center bg-white p-8 rounded-lg shadow-lg border-t-4 border-cyan-vibrant">
                        <h3 className="text-2xl font-bold text-navy">Gostou dos conteúdos?</h3>
                        <p className="mt-2 text-medium-gray">Assine para receber nossos artigos por e-mail.</p>
                        <form className="mt-6 flex flex-col sm:flex-row gap-3">
                            <input type="email" placeholder="Seu melhor e-mail" required className="flex-grow px-4 py-3 rounded-md border-gray-300 focus:ring-cyan-vibrant focus:border-cyan-vibrant transition"/>
                            <button type="submit" className="bg-orange-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-hover transition-colors">
                                Quero receber novidades
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogListPage;