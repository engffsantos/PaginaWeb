import React, { useEffect, useState } from 'react';
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
  excerpt?: string;
  content_md: string;
  cover_url?: string;
  category_id?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const API_BASE = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
  ? 'http://localhost:3001'
  : 'https://xlhyimcdz1m6.manus.space/api';

const BlogManagementPage: React.FC = () => {
  // Conversor simples de Markdown -> HTML (para pré‑visualização)
  const markdownToHtml = (markdown: string) => {
    if (!markdown) return '';
    let html = markdown;
    html = html.replace(/^###\s+(.*)$/gim, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.*)$/gim, '<h2>$1</h2>');
    html = html.replace(/^#\s+(.*)$/gim, '<h1>$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');
    html = html.replace(/\n/g, '<br/>');
    return html;
  };

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'categories'>('posts');

  // Criação
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    cover_url: '',
    excerpt: '',
    content_md: '',
    category_id: '',
    status: 'draft' as const,
  });

  // Edição
  const [showEditPost, setShowEditPost] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editPost, setEditPost] = useState({
    title: '',
    cover_url: '',
    excerpt: '',
    content_md: '',
    category_id: '',
    status: 'draft' as const,
  });

  // Categoria
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '' });

  useEffect(() => {
    checkAuth();
    loadPosts();
    loadCategories();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_BASE}/auth/me`, { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        window.location.href = '/login';
      }
    } catch (err) {
      setError('Erro ao verificar autenticação');
    }
  };

  const loadPosts = async () => {
    try {
      const response = await fetch(`${API_BASE}/posts?pageSize=50`, { credentials: 'include' });
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
      const response = await fetch(`${API_BASE}/categories`, { credentials: 'include' });
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
      const response = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newPost),
      });
      if (response.ok) {
        setShowCreatePost(false);
        setNewPost({ title: '', cover_url: '', excerpt: '', content_md: '', category_id: '', status: 'draft' });
        loadPosts();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Erro ao criar post');
      }
    } catch (err) {
      setError('Erro ao criar post');
    }
  };

  const openEditPost = (post: Post) => {
    setEditingPostId(post.id);
    setEditPost({
      title: post.title,
      cover_url: post.cover_url || '',
      excerpt: post.excerpt || '',
      content_md: post.content_md || '',
      category_id: post.category_id || '',
      status: post.status as typeof newPost.status,
    });
    setShowEditPost(true);
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPostId) return;
    try {
      const response = await fetch(`${API_BASE}/posts/${editingPostId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(editPost),
      });
      if (response.ok) {
        setShowEditPost(false);
        setEditingPostId(null);
        setEditPost({ title: '', cover_url: '', excerpt: '', content_md: '', category_id: '', status: 'draft' });
        loadPosts();
      } else {
        const err = await response.json().catch(() => ({}));
        setError(err.error || 'Erro ao atualizar post');
      }
    } catch (err) {
      setError('Erro ao atualizar post');
    }
  };

  const handlePublishPost = async (postId: string) => {
    try {
      const response = await fetch(`${API_BASE}/posts/${postId}/publish`, { method: 'PATCH', credentials: 'include' });
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
    if (!confirm('Tem certeza que deseja excluir este post?')) return;
    try {
      const response = await fetch(`${API_BASE}/posts/${postId}`, { method: 'DELETE', credentials: 'include' });
      if (response.ok) {
        loadPosts();
      } else {
        setError('Erro ao excluir post');
      }
    } catch (err) {
      setError('Erro ao excluir post');
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newCategory),
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

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, { method: 'POST', credentials: 'include' });
      window.location.href = '/login';
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: 'bg-gray-100 text-gray-800',
      scheduled: 'bg-yellow-100 text-yellow-800',
      published: 'bg-green-100 text-green-800',
    } as const;
    const labels = { draft: 'Rascunho', scheduled: 'Agendado', published: 'Publicado' } as const;
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
              <span className="text-sm text-gray-700">Olá, {user?.name}</span>
              <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-700">Sair</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
            <button onClick={() => setError(null)} className="float-right text-red-500 hover:text-red-700">×</button>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'posts' ? 'border-cyan-vibrant text-cyan-vibrant' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Posts ({posts.length})
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'categories' ? 'border-cyan-vibrant text-cyan-vibrant' : 'border-transparent text-gray-500 hover:text-gray-700'
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
              <button onClick={() => setShowCreatePost(true)} className="bg-cyan-vibrant text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition">
                Novo Post
              </button>
            </div>

            {/* Posts Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        <div className="text-sm text-gray-500">/{post.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(post.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.category_name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.author_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button onClick={() => openEditPost(post)} className="text-cyan-vibrant hover:text-cyan-600">Editar</button>
                          {post.status === 'draft' && (
                            <button onClick={() => handlePublishPost(post.id)} className="text-green-600 hover:text-green-900">Publicar</button>
                          )}
                          <button onClick={() => handleDeletePost(post.id)} className="text-red-600 hover:text-red-900">Excluir</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
              <button onClick={() => setShowCreateCategory(true)} className="bg-cyan-vibrant text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition">Nova Categoria</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category.id} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500">Slug: {category.slug}</p>
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Criar Novo Post</h3>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-vibrant"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem (opcional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newPost.cover_url}
                    onChange={(e) => setNewPost({ ...newPost, cover_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-vibrant"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resumo</label>
                  <textarea
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-vibrant"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo (Markdown)</label>
                  <textarea
                    value={newPost.content_md}
                    onChange={(e) => setNewPost({ ...newPost, content_md: e.target.value })}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-vibrant"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pré‑visualização</label>
                  <div
                    className="w-full min-h-[160px] border border-gray-200 rounded-md p-4 bg-gray-50 text-gray-800 overflow-auto"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(newPost.content_md) }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                  <select
                    value={newPost.category_id}
                    onChange={(e) => setNewPost({ ...newPost, category_id: e.target.value })}
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

      {/* Edit Post Modal */}
      {showEditPost && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-6 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white">
            <div className="mt-1">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Editar Post</h3>
              <form onSubmit={handleUpdatePost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    value={editPost.title}
                    onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-vibrant"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem (opcional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={editPost.cover_url}
                    onChange={(e) => setEditPost({ ...editPost, cover_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-vibrant"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resumo</label>
                    <textarea
                      value={editPost.excerpt}
                      onChange={(e) => setEditPost({ ...editPost, excerpt: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-vibrant"
                    />

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo (Markdown)</label>
                      <textarea
                        value={editPost.content_md}
                        onChange={(e) => setEditPost({ ...editPost, content_md: e.target.value })}
                        rows={10}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-vibrant"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pré‑visualização</label>
                    <div
                      className="w-full min-h-[200px] border border-gray-200 rounded-md p-4 bg-gray-50 text-gray-800 overflow-auto"
                      dangerouslySetInnerHTML={{ __html: markdownToHtml(editPost.content_md) }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select
                      value={editPost.category_id}
                      onChange={(e) => setEditPost({ ...editPost, category_id: e.target.value })}
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={editPost.status}
                      onChange={(e) => setEditPost({ ...editPost, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-vibrant"
                    >
                      <option value="draft">Rascunho</option>
                      <option value="scheduled">Agendado</option>
                      <option value="published">Publicado</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => { setShowEditPost(false); setEditingPostId(null); }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-cyan-vibrant rounded-md hover:bg-cyan-600"
                  >
                    Salvar Alterações
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Criar Nova Categoria</h3>
              
              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Categoria</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
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

