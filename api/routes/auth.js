import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { db } from '../db.js';

const router = express.Router();

// Schema de validaÃ§Ã£o para login
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

// Schema de validaÃ§Ã£o para registro
const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'editor', 'author', 'viewer']).default('author')
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Buscar usuÃ¡rio por email
    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email]
    });

    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ error: 'invalid_credentials' });
    }

    // Verificar senha
    const isValidPassword = bcrypt.compareSync(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'invalid_credentials' });
    }

    // Gerar tokens
    const accessToken = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Salvar refresh token no banco
    await db.execute({
      sql: 'INSERT INTO sessions (id, user_id, refresh_token, expires_at) VALUES (?, ?, ?, ?)',
      args: [
        uuidv4(),
        user.id,
        refreshToken,
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      ]
    });

    // Definir cookies
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 // 1 hora
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, role } = registerSchema.parse(req.body);

    // Hash da senha
    const passwordHash = bcrypt.hashSync(password, 12);

    // Criar usuÃ¡rio
    const userId = uuidv4();
    await db.execute({
      sql: 'INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
      args: [userId, name, email, passwordHash, role]
    });

    res.status(201).json({
      message: 'user_created',
      user: { id: userId, name, email, role }
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/refresh
router.post('/refresh', async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refresh_token;
    
    if (!refreshToken) {
      return res.status(401).json({ error: 'no_refresh_token' });
    }

    // Verificar refresh token
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);

    // Buscar sessÃ£o no banco
    const sessionResult = await db.execute({
      sql: 'SELECT * FROM sessions WHERE refresh_token = ? AND user_id = ? AND expires_at > datetime("now")',
      args: [refreshToken, payload.id]
    });

    if (sessionResult.rows.length === 0) {
      return res.status(401).json({ error: 'invalid_refresh_token' });
    }

    // Buscar dados do usuÃ¡rio
    const userResult = await db.execute({
      sql: 'SELECT * FROM users WHERE id = ?',
      args: [payload.id]
    });

    const user = userResult.rows[0];
    if (!user) {
      return res.status(401).json({ error: 'user_not_found' });
    }

    // Gerar novo access token
    const accessToken = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 // 1 hora
    });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/logout
router.post('/logout', async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refresh_token;
    
    if (refreshToken) {
      // Remover sessÃ£o do banco
      await db.execute({
        sql: 'DELETE FROM sessions WHERE refresh_token = ?',
        args: [refreshToken]
      });
    }

    // Limpar cookies
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    res.json({ message: 'logged_out' });
  } catch (error) {
    next(error);
  }
});

// GET /api/auth/me
router.get('/me', async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    
    if (!token) {
      return res.status(401).json({ error: 'unauthorized' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar dados atualizados do usuÃ¡rio
    const result = await db.execute({
      sql: 'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      args: [payload.id]
    });

    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ error: 'user_not_found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;


