import { createClient } from '@libsql/client';

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

// Função para executar migrations
export async function runMigrations() {
  try {
    // Criar tabela de usuários
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('admin','editor','author','viewer')),
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);

    // Criar tabela de categorias
    await db.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL
      )
    `);

    // Criar tabela de tags
    await db.execute(`
      CREATE TABLE IF NOT EXISTS tags (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL
      )
    `);

    // Criar tabela de posts
    await db.execute(`
      CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        cover_url TEXT,
        excerpt TEXT,
        content_md TEXT NOT NULL,
        content_html TEXT,
        status TEXT NOT NULL CHECK (status IN ('draft','scheduled','published')),
        published_at TEXT,
        author_id TEXT NOT NULL REFERENCES users(id),
        category_id TEXT REFERENCES categories(id),
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);

    // Criar tabela de relação post-tags
    await db.execute(`
      CREATE TABLE IF NOT EXISTS post_tags (
        post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        tag_id  TEXT NOT NULL REFERENCES tags(id)  ON DELETE CASCADE,
        PRIMARY KEY (post_id, tag_id)
      )
    `);

    // Criar tabela de sessões
    await db.execute(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id),
        refresh_token TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        expires_at TEXT NOT NULL
      )
    `);

    console.log('Migrations executadas com sucesso');
  } catch (error) {
    console.error('Erro ao executar migrations:', error);
    throw error;
  }
}

