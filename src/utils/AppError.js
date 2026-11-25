// Error with an HTTP status code, thrown from services/controllers
// and turned into a JSON response by the error handler.
class AppError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

module.exports = AppError;
