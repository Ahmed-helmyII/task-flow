const app = require('./app');
const config = require('./config');

const server = app.listen(config.port, () => {
  console.log(`${config.appName} running on http://localhost:${config.port} (${config.env})`);
});

// Graceful shutdown: finish open requests before exiting.
// Docker and Kubernetes send SIGTERM when they stop a container.
function shutdown(signal) {
  console.log(`${signal} received, shutting down...`);
  server.close(() => process.exit(0));
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
