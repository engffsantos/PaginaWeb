// /api/db.js
import { createClient } from '@libsql/client';

// Singleton p/ evitar múltiplas conexões em serverless
let _db = null;

function getDbConfigFromEnv() {
  // Aceita nomes comuns (Turso/LibSQL) e evita cair como undefined
  const url =
    process.env.TURSO_DATABASE_URL ||
    process.env.LIBSQL_URL ||
    process.env.NEXT_PUBLIC_TURSO_DATABASE_URL || // caso tenha setado errado como "public"
    null;

  const authToken =
    process.env.TURSO_AUTH_TOKEN ||
    process.env.LIBSQL_AUTH_TOKEN ||
    process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN || // idem
    null;

  if (!url) {
    // Erro explícito e legível no log da Vercel
    throw new Error(
      'DB_MISCONFIG: Variável de ambiente do banco ausente. Defina TURSO_DATABASE_URL (ou LIBSQL_URL).'
    );
  }

  // Avisos úteis
  if (url.startsWith('file:') || url.startsWith('libsql://file:')) {
    // Em funções serverless isso NÃO persiste e pode falhar (sistema de arquivos é read-only/efêmero)
    console.warn(
      'WARN: URL com "file:" detectada — não é recomendado em funções serverless da Vercel. Prefira Turso remoto.'
    );
  } else if (url.startsWith('libsql://') && !authToken) {
    console.warn(
      'WARN: URL remota libsql:// detectada sem TURSO_AUTH_TOKEN/ LIBSQL_AUTH_TOKEN. Conexões remotas exigem token.'
    );
  }

  return authToken ? { url, authToken } : { url };
}

// Retorna um client único (lazy)
export function getDb() {
  if (!_db) {
    const cfg = getDbConfigFromEnv();
    _db = createClient(cfg);
  }
  return _db;
}

// Compatibilidade com import antigo: `import { db } from './db.js'`
export const db = getDb();

// Função para executar migrations
export async function runMigrations() {
  const client = getDb();
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('admin','editor','author','viewer')),
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL
      );
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS tags (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL
      );
    `);

    await client.execute(`
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
      );
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS post_tags (
        post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        tag_id  TEXT NOT NULL REFERENCES tags(id)  ON DELETE CASCADE,
        PRIMARY KEY (post_id, tag_id)
      );
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id),
        refresh_token TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        expires_at TEXT NOT NULL
      );
    `);

    console.log('Migrations executadas com sucesso');
  } catch (error) {
    console.error('Erro ao executar migrations:', error);
    throw error;
  }
}
