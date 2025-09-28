export function errorHandler(err, req, res, next) {
  console.error('Error details:', {
    name: err.name,
    message: err.message,
    code: err.code,
    stack: err.stack,
    url: req.url,
    method: req.method
  });

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'validation_error',
      details: err.errors
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid_token'
    });
  }

  if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return res.status(409).json({
      error: 'duplicate_entry'
    });
  }

  // Erro genérico
  res.status(500).json({
    error: 'internal_server_error',
    message: err.message || 'Something went wrong'
  });
}

