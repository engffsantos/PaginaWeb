import React, { useState, useEffect } from 'react';
import Link from '../components/Link';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'scheduled' | 'published';
  created_at: string;
  updated_at: string;
  author_name: string;
  category_name?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const BlogManagementPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'categories'>('posts');

  // Estados para criação de post
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content_md: '',
    category_id: '',
    status: 'draft' as const
  });

  // Estados para criação de categoria
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: ''
  });

  useEffect(() => {
    checkAuth();
    loadPosts();
    loadCategories();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Redirecionar para login se não autenticado
        window.location.href = '/login';
      }
    } catch (err) {
      setError('Erro ao verificar autenticação');
    }
  };

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/posts?pageSize=50', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
      } else {
        setError('Erro ao carregar posts');
      }
    } catch (err) {
      setError('Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(newPost)
      });

      if (response.ok) {
        setShowCreatePost(false);
        setNewPost({
          title: '',
          excerpt: '',
          content_md: '',
          category_id: '',
          status: 'draft'
        });
        loadPosts();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Erro ao criar post');
      }
    } catch (err) {
      setError('Erro ao criar post');
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(newCategory)
      });

      if (response.ok) {
        setShowCreateCategory(false);
        setNewCategory({ name: '' });
        loadCategories();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Erro ao criar categoria');
      }
    } catch (err) {
      setError('Erro ao criar categoria');
    }
  };

  const handlePublishPost = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/publish`, {
        method: 'PATCH',
        credentials: 'include'
      });

      if (response.ok) {
        loadPosts();
      } else {
        setError('Erro ao publicar post');
      }
    } catch (err) {
      setError('Erro ao publicar post');
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Tem certeza que deseja deletar este post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        loadPosts();
      } else {
        setError('Erro ao deletar post');
      }
    } catch (err) {
      setError('Erro ao deletar post');
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      window.location.href = '/login';
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: 'bg-gray-100 text-gray-800',
      scheduled: 'bg-yellow-100 text-yellow-800',
      published: 'bg-green-100 text-green-800'
    };

    const labels = {
      draft: 'Rascunho',
      scheduled: 'Agendado',
      published: 'Publicado'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-vibrant mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-navy">
                EasyData<span className="text-cyan-vibrant">360</span>
              </Link>
              <span className="ml-4 text-gray-500">/ Gestão do Blog</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Olá, {user?.name}
              </span>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
            <button 
              onClick={() => setError(null)}
              className="float-right text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'posts'
                  ? 'border-cyan-vibrant text-cyan-vibrant'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Posts ({posts.length})
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'categories'
                  ? 'border-cyan-vibrant text-cyan-vibrant'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Categorias ({categories.length})
            </button>
          </nav>
        </div>

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Posts do Blog</h1>
              <button
                onClick={() => setShowCreatePost(true)}
                className="bg-cyan-vibrant text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
              >
                Novo Post
              </button>
            </div>

            {/* Posts Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoria
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Autor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          /{post.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(post.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {post.category_name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {post.author_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {post.status === 'draft' && (
                            <button
                              onClick={() => handlePublishPost(post.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Publicar
                            </button>
                          )}
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Deletar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {posts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Nenhum post encontrado.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
              <button
                onClick={() => setShowCreateCategory(true)}
                className="bg-cyan-vibrant text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
              >
                Nova Categoria
              </button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category.id} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Slug: {category.slug}
                  </p>
                </div>
              ))}
            </div>

            {categories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhuma categoria encontrada.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Criar Novo Post
              </h3>
              
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-vibrant"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resumo
                  </label>
                  <textarea
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-vibrant"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Conteúdo (Markdown)
                  </label>
                  <textarea
                    value={newPost.content_md}
                    onChange={(e) => setNewPost({...newPost, content_md: e.target.value})}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-vibrant"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    value={newPost.category_id}
                    onChange={(e) => setNewPost({...newPost, category_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-vibrant"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreatePost(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-cyan-vibrant rounded-md hover:bg-cyan-600"
                  >
                    Criar Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Category Modal */}
      {showCreateCategory && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Criar Nova Categoria
              </h3>
              
              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Categoria
                  </label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-vibrant"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateCategory(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-cyan-vibrant rounded-md hover:bg-cyan-600"
                  >
                    Criar Categoria
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagementPage;

