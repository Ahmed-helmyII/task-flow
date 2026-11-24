const users = require('../data/users');

// Handles requests that start with /users
function usersRoute(req, res) {
  const parts = req.url.split('/').filter(Boolean); // e.g. ['users', '2']

  // GET /users/:id
  if (parts.length === 2) {
    const id = Number(parts[1]);
    const user = users.find((u) => u.id === id);
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'User not found' }));
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(user));
  }

  // GET /users
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}

module.exports = usersRoute;
