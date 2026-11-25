const AppError = require('../utils/AppError');

// Express knows this is an error handler because it takes 4 arguments.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Invalid JSON in the request body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: { message: 'Invalid JSON body' } });
  }

  if (err instanceof AppError) {
    const body = { message: err.message };
    if (err.details) body.details = err.details;
    return res.status(err.statusCode).json({ error: body });
  }

  console.error(err);
  res.status(500).json({ error: { message: 'Internal server error' } });
}

module.exports = errorHandler;
