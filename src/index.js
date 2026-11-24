const http = require('http');
const config = require('./config/config');
const usersRoute = require('./routes/users');
const mathRoute = require('./routes/math');
const { capitalize } = require('./utils/stringHelpers');

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: `Welcome to ${capitalize(config.appName)}` }));
  }

  if (req.url.startsWith('/users')) return usersRoute(req, res);
  if (req.url.startsWith('/math')) return mathRoute(req, res);

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route not found' }));
});

server.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
