// /api/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error.js';

// Rotas (Express.Router)
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts_fixed.js';
import categoriesRoutes from './routes/categories_fixed.js';
import tagsRoutes from './routes/tags.js';

// *** IMPORTANTE ***
// NÃO importe nem execute runMigrations() aqui.
// Deixe migrations atrás de um endpoint protegido, pipeline de deploy, ou ferramenta externa.
// import { runMigrations } from './db.js';

const app = express();

// CORS — inclua também seu domínio de produção
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin, credentials: true }));

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

// *** REMOVA o prefixo /api aqui ***
// A pasta /api da Vercel já fornece esse prefixo.
app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/tags', tagsRoutes);

// Healthcheck simples
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Endpoint opcional para migrations (use com cuidado e proteja com auth/secret)
/// app.post('/setup', async (req, res, next) => {
///   try {
///     await runMigrations();
///     res.json({ message: 'Database setup completed' });
///   } catch (err) { next(err); }
/// });

// Tratamento de erros
app.use(errorHandler);

// *** PONTO-CHAVE PARA VERCEL ***
// Não chame app.listen. Apenas exporte o app (Express é um handler (req,res) válido).
export default app;
