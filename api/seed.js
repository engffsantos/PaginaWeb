import 'dotenv/config';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db.js';

async function seedDatabase() {
  try {
    console.log('Iniciando seed do banco de dados...');

    // Criar usuário admin
    const adminId = uuidv4();
    const passwordHash = await bcrypt.hash('admin123', 12);

    await db.execute({
      sql: 'INSERT OR IGNORE INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
      args: [adminId, 'Administrador', 'admin@easydata360.com', passwordHash, 'admin']
    });

    // Criar algumas categorias
    const categories = [
      { name: 'Tecnologia', slug: 'tecnologia' },
      { name: 'Negócios', slug: 'negocios' },
      { name: 'Tutoriais', slug: 'tutoriais' }
    ];

    for (const category of categories) {
      const categoryId = uuidv4();
      await db.execute({
        sql: 'INSERT OR IGNORE INTO categories (id, name, slug) VALUES (?, ?, ?)',
        args: [categoryId, category.name, category.slug]
      });
    }

    // Criar algumas tags
    const tags = [
      { name: 'React', slug: 'react' },
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'Node.js', slug: 'nodejs' },
      { name: 'API', slug: 'api' }
    ];

    for (const tag of tags) {
      const tagId = uuidv4();
      await db.execute({
        sql: 'INSERT OR IGNORE INTO tags (id, name, slug) VALUES (?, ?, ?)',
        args: [tagId, tag.name, tag.slug]
      });
    }

    console.log('Seed concluído com sucesso!');
    console.log('Usuário admin criado:');
    console.log('Email: admin@easydata360.com');
    console.log('Senha: admin123');

  } catch (error) {
    console.error('Erro no seed:', error);
  }
}

seedDatabase();

