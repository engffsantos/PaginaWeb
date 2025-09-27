import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// GET /api/tags - Listar todas as tags
router.get('/', async (req, res, next) => {
  try {
    const result = await db.execute({
      sql: `
        SELECT 
          t.*,
          COUNT(pt.post_id) as post_count
        FROM tags t
        LEFT JOIN post_tags pt ON t.id = pt.tag_id
        LEFT JOIN posts p ON pt.post_id = p.id AND p.status = 'published'
        GROUP BY t.id
        ORDER BY post_count DESC, t.name
      `
    });

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// GET /api/tags/:slug - Obter tag por slug
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;

    const result = await db.execute({
      sql: 'SELECT * FROM tags WHERE slug = ?',
      args: [slug]
    });

    const tag = result.rows[0];
    if (!tag) {
      return res.status(404).json({ error: 'tag_not_found' });
    }

    res.json(tag);
  } catch (error) {
    next(error);
  }
});

export default router;

