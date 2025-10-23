console.log('Loaded posts_fixed router');
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { requireAuth, optionalAuth } from '../middlewares/auth.js';

const router = express.Router();

// Banco de dados em memÃ³ria para demonstraÃ§Ã£o
let posts = [
  {
    id: '1',
    title: 'Bem-vindos ao Blog EasyData360',
    slug: 'bem-vindos-ao-blog-easydata360',
    excerpt: 'Apresentamos nosso novo blog com conteÃºdos sobre tecnologia e inovaÃ§Ã£o.',
    content_md: '# Bem-vindos ao Blog EasyData360\n\nEste Ã© nosso primeiro post no blog oficial da EasyData360. Aqui vocÃª encontrarÃ¡ conteÃºdos sobre tecnologia, inovaÃ§Ã£o e soluÃ§Ãµes digitais.',
    content_html: '<h1>Bem-vindos ao Blog EasyData360</h1><p>Este Ã© nosso primeiro post no blog oficial da EasyData360. Aqui vocÃª encontrarÃ¡ conteÃºdos sobre tecnologia, inovaÃ§Ã£o e soluÃ§Ãµes digitais.</p>',
    status: 'published',
    published_at: new Date().toISOString(),
    author_id: '6631483c-4c64-4d03-b88e-940881906172',
    category_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Schema de validaÃ§Ã£o para posts
const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  content_md: z.string().min(1),
  status: z.enum(['draft', 'scheduled', 'published']),
  published_at: z.string().optional(),
  category_id: z.string().optional(),
  tags: z.array(z.string()).optional()
});

// FunÃ§Ã£o para gerar slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

// FunÃ§Ã£o para converter markdown para HTML (simplificada)
function markdownToHtml(markdown) {
  return markdown
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n/gim, '<br>');
}

// GET /api/posts - Listar posts com paginaÃ§Ã£o
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 12;
    const status = req.query.status;
    const category = req.query.category;
    const search = req.query.search;

    let filteredPosts = [...posts];

    // Filtrar por status (apenas usuÃ¡rios autenticados podem ver rascunhos)
    if (status && req.user) {
      filteredPosts = filteredPosts.filter(p => p.status === status);
    } else if (!req.user) {
      filteredPosts = filteredPosts.filter(p => p.status === 'published');
    }

    // Filtrar por categoria
    if (category) {
      filteredPosts = filteredPosts.filter(p => p.category_id === category);
    }

    // Filtrar por busca
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = filteredPosts.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.excerpt?.toLowerCase().includes(searchLower) ||
        p.content_md.toLowerCase().includes(searchLower)
      );
    }

    // Ordenar por data de publicaÃ§Ã£o (mais recentes primeiro)
    filteredPosts.sort((a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at));

    // PaginaÃ§Ã£o
    const total = filteredPosts.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    res.json({
      posts: paginatedPosts,
      pagination: {
        page,
        pageSize,
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error('Erro na rota GET /posts:', error);
    res.status(500).json({ 
      error: 'internal_server_error', 
      message: error.message
    });
  }
});

// GET /api/posts/:slug - Obter post por slug
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const { slug } = req.params;
    const post = posts.find(p => p.slug === slug);
    
    if (!post) {
      return res.status(404).json({ error: 'post_not_found' });
    }

    // Verificar se o usuÃ¡rio pode ver este post
    if (post.status !== 'published' && !req.user) {
      return res.status(404).json({ error: 'post_not_found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Erro na rota GET /posts/:slug:', error);
    res.status(500).json({ 
      error: 'internal_server_error', 
      message: error.message
    });
  }
});

// POST /api/posts - Criar novo post
router.post('/', requireAuth('author'), async (req, res) => {
  try {
    const data = postSchema.parse(req.body);
    
    const postId = uuidv4();
    const slug = data.slug || generateSlug(data.title);
    const content_html = markdownToHtml(data.content_md);

    // Verificar se jÃ¡ existe post com mesmo slug
    const existingPost = posts.find(p => p.slug === slug);
    if (existingPost) {
      return res.status(409).json({ 
        error: 'duplicate_entry',
        message: 'Post with this slug already exists'
      });
    }

    const newPost = {
      id: postId,
      title: data.title,
      slug,
      excerpt: data.excerpt || '',
      content_md: data.content_md,
      content_html,
      status: data.status,
      published_at: data.status === 'published' ? (data.published_at || new Date().toISOString()) : null,
      author_id: req.user.id,
      category_id: data.category_id || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    posts.push(newPost);

    res.status(201).json({
      message: 'post_created',
      post: newPost
    });
  } catch (error) {
    console.error('Erro na rota POST /posts:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'validation_error',
        details: error.errors
      });
    }
    res.status(500).json({ 
      error: 'internal_server_error', 
      message: error.message
    });
  }
});

// PUT /api/posts/:id - Atualizar post
router.put('/:id', requireAuth('author'), async (req, res) => {
  try {
    const { id } = req.params;
    const data = postSchema.parse(req.body);

    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      return res.status(404).json({ error: 'post_not_found' });
    }

    const post = posts[postIndex];

    // Verificar se o usuÃ¡rio pode editar este post
    if (post.author_id !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'editor') {
      return res.status(403).json({ error: 'forbidden' });
    }

    const slug = data.slug || generateSlug(data.title);
    const content_html = markdownToHtml(data.content_md);

    // Verificar se jÃ¡ existe outro post com mesmo slug
    const existingPost = posts.find(p => p.id !== id && p.slug === slug);
    if (existingPost) {
      return res.status(409).json({ 
        error: 'duplicate_entry',
        message: 'Post with this slug already exists'
      });
    }

    const updatedPost = {
      ...post,
      title: data.title,
      slug,
      excerpt: data.excerpt || '',
      content_md: data.content_md,
      content_html,
      status: data.status,
      published_at: data.status === 'published' ? (data.published_at || post.published_at || new Date().toISOString()) : null,
      category_id: data.category_id || null,
      updated_at: new Date().toISOString()
    };

    posts[postIndex] = updatedPost;

    res.json({
      message: 'post_updated',
      post: updatedPost
    });
  } catch (error) {
    console.error('Erro na rota PUT /posts/:id:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'validation_error',
        details: error.errors
      });
    }
    res.status(500).json({ 
      error: 'internal_server_error', 
      message: error.message
    });
  }
});

// DELETE /api/posts/:id - Deletar post
router.delete('/:id', requireAuth('author'), async (req, res) => {
  try {
    const { id } = req.params;

    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      return res.status(404).json({ error: 'post_not_found' });
    }

    const post = posts[postIndex];

    // Verificar se o usuÃ¡rio pode deletar este post
    if (post.author_id !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'editor') {
      return res.status(403).json({ error: 'forbidden' });
    }

    posts.splice(postIndex, 1);

    res.json({ message: 'post_deleted' });
  } catch (error) {
    console.error('Erro na rota DELETE /posts/:id:', error);
    res.status(500).json({ 
      error: 'internal_server_error', 
      message: error.message
    });
  }
});

// PATCH /api/posts/:id/publish - Publicar post (memÃ³ria)
router.patch('/:id/publish', requireAuth('editor'), async (req, res) => {
  try {
    const { id } = req.params;

    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'post_not_found' });
    }

    posts[idx] = {
      ...posts[idx],
      status: 'published',
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    res.json({ message: 'post_published' });
  } catch (error) {
    console.error('Erro na rota PATCH /posts/:id/publish:', error);
    res.status(500).json({ error: 'internal_server_error', message: error.message });
  }
});

export default router;


