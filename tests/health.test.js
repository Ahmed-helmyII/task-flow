const { test, before, after } = require('node:test');
const assert = require('node:assert');
const { startServer } = require('./helpers');

let server;
let baseUrl;

before(async () => {
  ({ server, baseUrl } = await startServer());
});
after(() => server.close());

test('GET /health returns ok', async () => {
  const res = await fetch(`${baseUrl}/health`);
  const body = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(body.status, 'ok');
});

test('unknown route returns 404', async () => {
  const res = await fetch(`${baseUrl}/nope`);
  assert.strictEqual(res.status, 404);
});
