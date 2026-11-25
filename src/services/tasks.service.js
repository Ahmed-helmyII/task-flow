const { randomUUID } = require('crypto');
const AppError = require('../utils/AppError');

// In-memory storage for now. This file is the only place that knows
// where tasks are stored, so moving to PostgreSQL later only changes this file.
let tasks = [];

function list({ status, priority } = {}) {
  return tasks.filter(
    (task) => (!status || task.status === status) && (!priority || task.priority === priority)
  );
}

function getById(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) throw new AppError(404, `Task ${id} not found`);
  return task;
}

function create({ title, description = '', status = 'todo', priority = 'medium' }) {
  const now = new Date().toISOString();
  const task = {
    id: randomUUID(),
    title: title.trim(),
    description,
    status,
    priority,
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(task);
  return task;
}

function update(id, changes) {
  const task = getById(id);
  for (const key of ['title', 'description', 'status', 'priority']) {
    if (changes[key] !== undefined) {
      task[key] = key === 'title' ? changes[key].trim() : changes[key];
    }
  }
  task.updatedAt = new Date().toISOString();
  return task;
}

function remove(id) {
  getById(id);
  tasks = tasks.filter((t) => t.id !== id);
}

// Used by tests to start from an empty list.
function reset() {
  tasks = [];
}

module.exports = { list, getById, create, update, remove, reset };
