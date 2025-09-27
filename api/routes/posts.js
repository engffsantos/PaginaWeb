import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { db } from '../db.js';
import { requireAuth, optionalAuth } from '../middlewares/auth.js';

const router = express.Router();

// Schema de validação para posts
const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).optional(),
  cover_url: z.string().url().optional(),
  excerpt: z.string().optional(),
  content_md: z.string().min(1),
  status: z.enum(['draft', 'scheduled', 'published']).default('draft'),
  published_at: z.string().optional(),
  category_id: z.string().optional(),
  tags: z.array(z.string()).optional()
});

// Função para gerar slug único
async function ensureUniqueSlug(baseSlug, excludeId = null) {
  let slug = baseSlug;
  let counter = 2;
  
  while (true) {
    const query = excludeId 
      ? 'SELECT 1 FROM posts WHERE slug = ? AND id != ?'
      : 'SELECT 1 FROM posts WHERE slug = ?';
    const args = excludeId ? [slug, excludeId] : [slug];
    
    const result = await db.execute({ sql: query, args });
    
    if (result.rows.length === 0) {
      return slug;
    }
    
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

// Função para gerar slug a partir do título
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim('-'); // Remove hífens do início e fim
}

// GET /api/posts - Listar posts (com paginação e filtros)
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const {
      page = 1,
      pageSize = 12,
      status,
      category,
      tag,
      q, // busca por texto
      author_id
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(pageSize);
    const limit = parseInt(pageSize);

    let whereConditions = [];
    let args = [];

    // Filtro por status (usuários não autenticados só veem publicados)
    if (!req.user) {
      whereConditions.push("p.status = 'published'");
    } else if (status) {
      whereConditions.push("p.status = ?");
      args.push(status);
    }

    // Filtro por categoria
    if (category) {
      whereConditions.push("c.slug = ?");
      args.push(category);
    }

    // Filtro por autor
    if (author_id) {
      whereConditions.push("p.author_id = ?");
      args.push(author_id);
    }

    // Busca por texto (título, excerpt, conteúdo)
    if (q) {
      whereConditions.push("(p.title LIKE ? OR p.excerpt LIKE ? OR p.content_md LIKE ?)");
      const searchTerm = `%${q}%`;
      args.push(searchTerm, searchTerm, searchTerm);
    }

    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}`
      : '';

    // Query principal
    const query = `
      SELECT 
        p.*,
        u.name as author_name,
        c.name as category_name,
        c.slug as category_slug
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;

    args.push(limit, offset);

    const result = await db.execute({ sql: query, args });

    // Buscar tags para cada post
    const postsWithTags = await Promise.all(
      result.rows.map(async (post) => {
        const tagsResult = await db.execute({
          sql: `
            SELECT t.id, t.name, t.slug
            FROM tags t
            JOIN post_tags pt ON t.id = pt.tag_id
            WHERE pt.post_id = ?
          `,
          args: [post.id]
        });

        return {
          ...post,
          tags: tagsResult.rows
        };
      })
    );

    // Contar total para paginação
    const countQuery = `
      SELECT COUNT(*) as total
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      ${whereClause}
    `;

    const countResult = await db.execute({ 
      sql: countQuery, 
      args: args.slice(0, -2) // Remove limit e offset
    });

    const total = countResult.rows[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      posts: postsWithTags,
      pagination: {
        page: parseInt(page),
        pageSize: limit,
        total,
        totalPages
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/posts/:slug - Obter post por slug
router.get('/:slug', optionalAuth, async (req, res, next) => {
  try {
    const { slug } = req.params;

    const result = await db.execute({
      sql: `
        SELECT 
          p.*,
          u.name as author_name,
          c.name as category_name,
          c.slug as category_slug
        FROM posts p
        LEFT JOIN users u ON p.author_id = u.id
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.slug = ?
      `,
      args: [slug]
    });

    const post = result.rows[0];
    if (!post) {
      return res.status(404).json({ error: 'post_not_found' });
    }

    // Verificar permissões
    if (post.status !== 'published' && !req.user) {
      return res.status(404).json({ error: 'post_not_found' });
    }

    if (post.status !== 'published' && req.user) {
      const roles = ['viewer', 'author', 'editor', 'admin'];
      const userRoleIndex = roles.indexOf(req.user.role);
      
      // Autor pode ver seus próprios posts, editor+ pode ver todos
      if (post.author_id !== req.user.id && userRoleIndex < 2) {
        return res.status(404).json({ error: 'post_not_found' });
      }
    }

    // Buscar tags do post
    const tagsResult = await db.execute({
      sql: `
        SELECT t.id, t.name, t.slug
        FROM tags t
        JOIN post_tags pt ON t.id = pt.tag_id
        WHERE pt.post_id = ?
      `,
      args: [post.id]
    });

    res.json({
      ...post,
      tags: tagsResult.rows
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/posts - Criar novo post
router.post('/', requireAuth('author'), async (req, res, next) => {
  try {
    const data = postSchema.parse(req.body);
    
    const postId = uuidv4();
    const slug = data.slug || generateSlug(data.title);
    const uniqueSlug = await ensureUniqueSlug(slug);

    // Inserir post
    await db.execute({
      sql: `
        INSERT INTO posts (
          id, title, slug, cover_url, excerpt, content_md, 
          status, published_at, author_id, category_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        postId,
        data.title,
        uniqueSlug,
        data.cover_url || null,
        data.excerpt || null,
        data.content_md,
        data.status,
        data.published_at || null,
        req.user.id,
        data.category_id || null
      ]
    });

    // Inserir tags se fornecidas
    if (data.tags && data.tags.length > 0) {
      for (const tagName of data.tags) {
        // Criar tag se não existir
        const tagSlug = generateSlug(tagName);
        const tagId = uuidv4();
        
        await db.execute({
          sql: 'INSERT OR IGNORE INTO tags (id, name, slug) VALUES (?, ?, ?)',
          args: [tagId, tagName, tagSlug]
        });

        // Buscar ID da tag
        const tagResult = await db.execute({
          sql: 'SELECT id FROM tags WHERE slug = ?',
          args: [tagSlug]
        });

        // Associar tag ao post
        await db.execute({
          sql: 'INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)',
          args: [postId, tagResult.rows[0].id]
        });
      }
    }

    res.status(201).json({
      message: 'post_created',
      post: { id: postId, slug: uniqueSlug }
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/posts/:id - Atualizar post
router.put('/:id', requireAuth('author'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = postSchema.parse(req.body);

    // Verificar se o post existe e se o usuário tem permissão
    const postResult = await db.execute({
      sql: 'SELECT * FROM posts WHERE id = ?',
      args: [id]
    });

    const post = postResult.rows[0];
    if (!post) {
      return res.status(404).json({ error: 'post_not_found' });
    }

    // Verificar permissões
    const roles = ['viewer', 'author', 'editor', 'admin'];
    const userRoleIndex = roles.indexOf(req.user.role);
    
    if (post.author_id !== req.user.id && userRoleIndex < 2) {
      return res.status(403).json({ error: 'forbidden' });
    }

    // Gerar slug se necessário
    let slug = data.slug || post.slug;
    if (data.title !== post.title && !data.slug) {
      slug = generateSlug(data.title);
    }
    
    const uniqueSlug = await ensureUniqueSlug(slug, id);

    // Atualizar post
    await db.execute({
      sql: `
        UPDATE posts SET
          title = ?, slug = ?, cover_url = ?, excerpt = ?,
          content_md = ?, status = ?, published_at = ?,
          category_id = ?, updated_at = datetime('now')
        WHERE id = ?
      `,
      args: [
        data.title,
        uniqueSlug,
        data.cover_url || null,
        data.excerpt || null,
        data.content_md,
        data.status,
        data.published_at || null,
        data.category_id || null,
        id
      ]
    });

    // Atualizar tags
    if (data.tags !== undefined) {
      // Remover tags existentes
      await db.execute({
        sql: 'DELETE FROM post_tags WHERE post_id = ?',
        args: [id]
      });

      // Inserir novas tags
      if (data.tags.length > 0) {
        for (const tagName of data.tags) {
          const tagSlug = generateSlug(tagName);
          const tagId = uuidv4();
          
          await db.execute({
            sql: 'INSERT OR IGNORE INTO tags (id, name, slug) VALUES (?, ?, ?)',
            args: [tagId, tagName, tagSlug]
          });

          const tagResult = await db.execute({
            sql: 'SELECT id FROM tags WHERE slug = ?',
            args: [tagSlug]
          });

          await db.execute({
            sql: 'INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)',
            args: [id, tagResult.rows[0].id]
          });
        }
      }
    }

    res.json({
      message: 'post_updated',
      post: { id, slug: uniqueSlug }
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/posts/:id - Deletar post
router.delete('/:id', requireAuth('editor'), async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verificar se o post existe
    const postResult = await db.execute({
      sql: 'SELECT * FROM posts WHERE id = ?',
      args: [id]
    });

    const post = postResult.rows[0];
    if (!post) {
      return res.status(404).json({ error: 'post_not_found' });
    }

    // Verificar permissões (autor pode deletar apenas rascunhos)
    if (req.user.role === 'author') {
      if (post.author_id !== req.user.id || post.status !== 'draft') {
        return res.status(403).json({ error: 'forbidden' });
      }
    }

    // Deletar post (cascade vai remover as tags)
    await db.execute({
      sql: 'DELETE FROM posts WHERE id = ?',
      args: [id]
    });

    res.json({ message: 'post_deleted' });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/posts/:id/publish - Publicar post
router.patch('/:id/publish', requireAuth('editor'), async (req, res, next) => {
  try {
    const { id } = req.params;

    await db.execute({
      sql: `
        UPDATE posts SET 
          status = 'published',
          published_at = datetime('now'),
          updated_at = datetime('now')
        WHERE id = ?
      `,
      args: [id]
    });

    res.json({ message: 'post_published' });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/posts/:id/schedule - Agendar publicação
router.patch('/:id/schedule', requireAuth('editor'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { published_at } = req.body;

    if (!published_at) {
      return res.status(400).json({ error: 'published_at_required' });
    }

    await db.execute({
      sql: `
        UPDATE posts SET 
          status = 'scheduled',
          published_at = ?,
          updated_at = datetime('now')
        WHERE id = ?
      `,
      args: [published_at, id]
    });

    res.json({ message: 'post_scheduled' });
  } catch (error) {
    next(error);
  }
});

export default router;

