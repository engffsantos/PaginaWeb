import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { db } from '../db.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

// Schema de validação para categorias
const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).optional()
});

// Função para gerar slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

// GET /api/categories - Listar todas as categorias
router.get('/', async (req, res, next) => {
  try {
    const result = await db.execute({
      sql: `
        SELECT 
          c.*,
          COUNT(p.id) as post_count
        FROM categories c
        LEFT JOIN posts p ON c.id = p.category_id AND p.status = 'published'
        GROUP BY c.id
        ORDER BY c.name
      `
    });

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// GET /api/categories/:slug - Obter categoria por slug
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;

    const result = await db.execute({
      sql: 'SELECT * FROM categories WHERE slug = ?',
      args: [slug]
    });

    const category = result.rows[0];
    if (!category) {
      return res.status(404).json({ error: 'category_not_found' });
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
});

// POST /api/categories - Criar nova categoria
router.post('/', requireAuth('editor'), async (req, res, next) => {
  try {
    const data = categorySchema.parse(req.body);
    
    const categoryId = uuidv4();
    const slug = data.slug || generateSlug(data.name);

    await db.execute({
      sql: 'INSERT INTO categories (id, name, slug) VALUES (?, ?, ?)',
      args: [categoryId, data.name, slug]
    });

    res.status(201).json({
      message: 'category_created',
      category: { id: categoryId, name: data.name, slug }
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/categories/:id - Atualizar categoria
router.put('/:id', requireAuth('editor'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = categorySchema.parse(req.body);

    const slug = data.slug || generateSlug(data.name);

    await db.execute({
      sql: 'UPDATE categories SET name = ?, slug = ? WHERE id = ?',
      args: [data.name, slug, id]
    });

    res.json({
      message: 'category_updated',
      category: { id, name: data.name, slug }
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/categories/:id - Deletar categoria
router.delete('/:id', requireAuth('admin'), async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verificar se há posts usando esta categoria
    const postsResult = await db.execute({
      sql: 'SELECT COUNT(*) as count FROM posts WHERE category_id = ?',
      args: [id]
    });

    if (postsResult.rows[0].count > 0) {
      return res.status(400).json({ 
        error: 'category_in_use',
        message: 'Cannot delete category that is being used by posts'
      });
    }

    await db.execute({
      sql: 'DELETE FROM categories WHERE id = ?',
      args: [id]
    });

    res.json({ message: 'category_deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;

