import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { runMigrations } from './db.js';
import { errorHandler } from './middlewares/error.js';

// Importar rotas
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import categoriesRoutes from './routes/categories.js';
import tagsRoutes from './routes/tags.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/tags', tagsRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rota para executar migrations
app.post('/api/setup', async (req, res, next) => {
  try {
    await runMigrations();
    res.json({ message: 'Database setup completed' });
  } catch (error) {
    next(error);
  }
});

// Middleware de tratamento de erros
app.use(errorHandler);

// Inicializar servidor
async function startServer() {
  try {
    // Executar migrations na inicialização
    await runMigrations();
    console.log('Database migrations completed');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Iniciar apenas se não estiver sendo importado
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}

export default app;

