process.env.NODE_ENV = 'test';
const app = require('../src/app');

// Starts the app on a random free port and returns its base URL.
function startServer() {
  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      const { port } = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

module.exports = { startServer };
