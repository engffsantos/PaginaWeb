export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

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
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
}

