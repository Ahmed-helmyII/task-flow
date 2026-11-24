const { add, subtract, multiply } = require('../utils/math');

// GET /math?a=5&b=3
function mathRoute(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const a = Number(url.searchParams.get('a'));
  const b = Number(url.searchParams.get('b'));

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'a and b must be numbers' }));
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      a,
      b,
      sum: add(a, b),
      difference: subtract(a, b),
      product: multiply(a, b),
    })
  );
}

module.exports = mathRoute;
