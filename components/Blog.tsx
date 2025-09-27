import React from 'react';
import Link from './Link';
import { posts } from '../blog/data';

const latestPosts = posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 3);

const Blog: React.FC = () => {
  return (
    <section id="blog" className="bg-off-white py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy">Últimos posts do Blog</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative">
                  <img src={post.cover_image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                </div>
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-navy group-hover:text-cyan-vibrant transition-colors h-16">{post.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm flex-grow">{post.summary}</p>
                  <span className="mt-4 text-cyan-vibrant font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Leia mais &rarr;
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link href="/blog" className="text-cyan-vibrant font-semibold text-lg hover:text-navy transition-colors">
            Ver todos os artigos &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;