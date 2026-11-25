const { test, before, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const { startServer } = require('./helpers');
const tasksService = require('../src/services/tasks.service');

let server;
let baseUrl;

before(async () => {
  ({ server, baseUrl } = await startServer());
});
after(() => server.close());
beforeEach(() => tasksService.reset());

function request(method, path, body) {
  return fetch(`${baseUrl}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

async function createTask(body) {
  const res = await request('POST', '/api/v1/tasks', body);
  return (await res.json()).data;
}

test('POST creates a task with default status and priority', async () => {
  const res = await request('POST', '/api/v1/tasks', { title: 'Write README' });
  const { data } = await res.json();
  assert.strictEqual(res.status, 201);
  assert.strictEqual(data.title, 'Write README');
  assert.strictEqual(data.status, 'todo');
  assert.strictEqual(data.priority, 'medium');
  assert.ok(data.id);
});

test('POST without title returns 400', async () => {
  const res = await request('POST', '/api/v1/tasks', { priority: 'high' });
  const body = await res.json();
  assert.strictEqual(res.status, 400);
  assert.match(body.error.details[0], /title/);
});

test('POST with invalid JSON returns 400', async () => {
  const res = await fetch(`${baseUrl}/api/v1/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{bad json',
  });
  assert.strictEqual(res.status, 400);
});

test('GET lists tasks and filters by status', async () => {
  await createTask({ title: 'A' });
  await createTask({ title: 'B', status: 'done' });

  const all = await (await request('GET', '/api/v1/tasks')).json();
  assert.strictEqual(all.count, 2);

  const done = await (await request('GET', '/api/v1/tasks?status=done')).json();
  assert.strictEqual(done.count, 1);
  assert.strictEqual(done.data[0].title, 'B');
});

test('GET with an invalid status filter returns 400', async () => {
  const res = await request('GET', '/api/v1/tasks?status=wrong');
  assert.strictEqual(res.status, 400);
});

test('GET /:id returns 404 for an unknown task', async () => {
  const res = await request('GET', '/api/v1/tasks/does-not-exist');
  assert.strictEqual(res.status, 404);
});

test('PATCH updates only the given fields', async () => {
  const created = await createTask({ title: 'A' });

  const res = await request('PATCH', `/api/v1/tasks/${created.id}`, { status: 'in_progress' });
  const { data } = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(data.status, 'in_progress');
  assert.strictEqual(data.title, 'A');
});

test('PATCH with an invalid priority returns 400', async () => {
  const created = await createTask({ title: 'A' });
  const res = await request('PATCH', `/api/v1/tasks/${created.id}`, { priority: 'urgent' });
  assert.strictEqual(res.status, 400);
});

test('DELETE removes the task', async () => {
  const created = await createTask({ title: 'A' });

  const res = await request('DELETE', `/api/v1/tasks/${created.id}`);
  assert.strictEqual(res.status, 204);

  const check = await request('GET', `/api/v1/tasks/${created.id}`);
  assert.strictEqual(check.status, 404);
});
