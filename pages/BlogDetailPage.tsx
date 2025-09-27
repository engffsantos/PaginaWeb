import React from 'react';
import { posts, Post } from '../features/blog/data';
import Link from '../components/Link';

interface BlogDetailPageProps {
  post: Post;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ post }) => {
    const relatedPosts = posts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);
    
    return (
        <div className="bg-white">
            <article>
                {/* Header Section */}
                <header className="bg-light-gray py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                        <p className="text-cyan-vibrant font-semibold uppercase tracking-wider">{post.category}</p>
                        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-navy">{post.title}</h1>
                        <p className="mt-6 text-lg text-gray-500">
                            Por {post.author} &bull; {new Date(post.created_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                </header>
                
                {/* Cover Image */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
                     <img src={post.cover_image} alt={post.title} className="w-full max-w-5xl mx-auto h-auto object-cover rounded-lg shadow-2xl" style={{aspectRatio: '16/9'}} />
                </div>

                {/* Article Content */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div 
                        className="prose lg:prose-xl max-w-3xl mx-auto"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share CTA */}
                    <div className="max-w-3xl mx-auto mt-16 text-center border-t pt-8">
                        <h3 className="text-xl font-bold text-navy">Gostou do conteúdo? Compartilhe!</h3>
                        <div className="flex justify-center gap-4 mt-4">
                            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + window.location.href)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-green-600 transition-colors">WhatsApp</a>
                            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="bg-blue-700 text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-800 transition-colors">LinkedIn</a>
                            <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent("Confira este artigo: " + window.location.href)}`} className="bg-gray-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-gray-600 transition-colors">Email</a>
                        </div>
                    </div>
                </div>

            </article>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
                <section className="bg-light-gray py-20 lg:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-navy text-center mb-12">Artigos Relacionados</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                           {relatedPosts.map((relatedPost) => (
                                <div key={relatedPost.id} className="bg-white rounded-lg shadow-lg overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2">
                                    <Link href={`/blog/${relatedPost.slug}`} className="block">
                                        <div className="relative">
                                            <img src={relatedPost.cover_image} alt={relatedPost.title} className="w-full h-48 object-cover" />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-navy group-hover:text-cyan-vibrant transition-colors h-20">{relatedPost.title}</h3>
                                            <span className="mt-4 text-cyan-vibrant font-semibold text-sm">
                                                Leia mais &rarr;
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                           ))}
                        </div>
                    </div>
                </section>
            )}
            
        </div>
    );
};

export default BlogDetailPage;