import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

// Banco de dados em memória para demonstração
let categories = [
  { id: '1', name: 'Tecnologia', slug: 'tecnologia' },
  { id: '2', name: 'Negócios', slug: 'negocios' },
  { id: '3', name: 'Inovação', slug: 'inovacao' }
];

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
router.get('/', async (req, res) => {
  try {
    res.json(categories);
  } catch (error) {
    console.error('Erro na rota GET /categories:', error);
    res.status(500).json({ 
      error: 'internal_server_error', 
      message: error.message
    });
  }
});

// GET /api/categories/:slug - Obter categoria por slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const category = categories.find(c => c.slug === slug);
    
    if (!category) {
      return res.status(404).json({ error: 'category_not_found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Erro na rota GET /categories/:slug:', error);
    res.status(500).json({ 
      error: 'internal_server_error', 
      message: error.message
    });
  }
});

// POST /api/categories - Criar nova categoria
router.post('/', requireAuth('editor'), async (req, res) => {
  try {
    const data = categorySchema.parse(req.body);
    
    const categoryId = uuidv4();
    const slug = data.slug || generateSlug(data.name);

    // Verificar se já existe categoria com mesmo nome ou slug
    const existingCategory = categories.find(c => 
      c.name.toLowerCase() === data.name.toLowerCase() || c.slug === slug
    );

    if (existingCategory) {
      return res.status(409).json({ 
        error: 'duplicate_entry',
        message: 'Category with this name or slug already exists'
      });
    }

    const newCategory = { id: categoryId, name: data.name, slug };
    categories.push(newCategory);

    res.status(201).json({
      message: 'category_created',
      category: newCategory
    });
  } catch (error) {
    console.error('Erro na rota POST /categories:', error);
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

// PUT /api/categories/:id - Atualizar categoria
router.put('/:id', requireAuth('editor'), async (req, res) => {
  try {
    const { id } = req.params;
    const data = categorySchema.parse(req.body);

    const categoryIndex = categories.findIndex(c => c.id === id);
    if (categoryIndex === -1) {
      return res.status(404).json({ error: 'category_not_found' });
    }

    const slug = data.slug || generateSlug(data.name);

    // Verificar se já existe outra categoria com mesmo nome ou slug
    const existingCategory = categories.find(c => 
      c.id !== id && (c.name.toLowerCase() === data.name.toLowerCase() || c.slug === slug)
    );

    if (existingCategory) {
      return res.status(409).json({ 
        error: 'duplicate_entry',
        message: 'Category with this name or slug already exists'
      });
    }

    categories[categoryIndex] = { id, name: data.name, slug };

    res.json({
      message: 'category_updated',
      category: categories[categoryIndex]
    });
  } catch (error) {
    console.error('Erro na rota PUT /categories/:id:', error);
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

// DELETE /api/categories/:id - Deletar categoria
router.delete('/:id', requireAuth('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const categoryIndex = categories.findIndex(c => c.id === id);
    if (categoryIndex === -1) {
      return res.status(404).json({ error: 'category_not_found' });
    }

    categories.splice(categoryIndex, 1);

    res.json({ message: 'category_deleted' });
  } catch (error) {
    console.error('Erro na rota DELETE /categories/:id:', error);
    res.status(500).json({ 
      error: 'internal_server_error', 
      message: error.message
    });
  }
});

export default router;

