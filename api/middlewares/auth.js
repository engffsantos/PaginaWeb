import jwt from 'jsonwebtoken';

export function requireAuth(requiredRole) {
  return (req, res, next) => {
    const token = req.cookies?.access_token;
    
    if (!token) {
      return res.status(401).json({ error: 'unauthorized' });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      
      if (requiredRole) {
        const roles = ['viewer', 'author', 'editor', 'admin'];
        const userRoleIndex = roles.indexOf(payload.role);
        const requiredRoleIndex = roles.indexOf(requiredRole);
        
        if (userRoleIndex < requiredRoleIndex) {
          return res.status(403).json({ error: 'forbidden' });
        }
      }
      
      req.user = payload;
      next();
    } catch (error) {
      res.status(401).json({ error: 'invalid_token' });
    }
  };
}

export function optionalAuth(req, res, next) {
  const token = req.cookies?.access_token;
  
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
    } catch (error) {
      // Token inválido, mas não bloqueia a requisição
    }
  }
  
  next();
}

