// /api/db.js
import { createClient } from '@libsql/client';

// Singleton para não recriar conexão a cada request (serverless)
let _db = null;

/**
 * Lê as variáveis de ambiente e monta a configuração do client
 */
function getDbConfigFromEnv() {
  const url =
    process.env.TURSO_DATABASE_URL ||
    process.env.LIBSQL_URL ||
    null;

  const authToken =
    process.env.TURSO_AUTH_TOKEN ||
    process.env.LIBSQL_AUTH_TOKEN ||
    null;

  if (!url) {
    throw new Error(
      'DB_MISCONFIG: Variável de ambiente do banco ausente. Defina TURSO_DATABASE_URL (ou LIBSQL_URL) nas variáveis do projeto na Vercel.'
    );
  }

  if (url.startsWith('libsql://') && !authToken) {
    console.warn(
      'WARN: URL remota libsql:// detectada sem TURSO_AUTH_TOKEN. Turso remoto precisa de token.'
    );
  }

  if (url.startsWith('file:') || url.startsWith('libsql://file:')) {
    console.warn(
      'WARN: URL com "file:" não é recomendado em funções serverless da Vercel (não persiste).'
    );
  }

  return authToken ? { url, authToken } : { url };
}

/**
 * Retorna um client único (singleton)
 */
export function getDb() {
  if (!_db) {
    const cfg = getDbConfigFromEnv();
    _db = createClient(cfg);
  }
  return _db;
}

/**
 * Executa migrations para criar tabelas se não existirem
 */
export async function runMigrations() {
  const db = getDb();
  try {
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

    await db.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS tags (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL
      )
    `);

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

    await db.execute(`
      CREATE TABLE IF NOT EXISTS post_tags (
        post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        tag_id  TEXT NOT NULL REFERENCES tags(id)  ON DELETE CASCADE,
        PRIMARY KEY (post_id, tag_id)
      )
    `);

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
