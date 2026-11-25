const tasksService = require('../services/tasks.service');
const { validateTask, STATUSES, PRIORITIES } = require('../utils/validateTask');
const AppError = require('../utils/AppError');

function listTasks(req, res) {
  const { status, priority } = req.query;

  if (status && !STATUSES.includes(status)) {
    throw new AppError(400, `status must be one of: ${STATUSES.join(', ')}`);
  }
  if (priority && !PRIORITIES.includes(priority)) {
    throw new AppError(400, `priority must be one of: ${PRIORITIES.join(', ')}`);
  }

  const tasks = tasksService.list({ status, priority });
  res.json({ count: tasks.length, data: tasks });
}

function getTask(req, res) {
  res.json({ data: tasksService.getById(req.params.id) });
}

function createTask(req, res) {
  const errors = validateTask(req.body);
  if (errors.length) throw new AppError(400, 'Validation failed', errors);

  res.status(201).json({ data: tasksService.create(req.body) });
}

function updateTask(req, res) {
  const errors = validateTask(req.body, { partial: true });
  if (errors.length) throw new AppError(400, 'Validation failed', errors);

  res.json({ data: tasksService.update(req.params.id, req.body) });
}

function deleteTask(req, res) {
  tasksService.remove(req.params.id);
  res.status(204).end();
}

module.exports = { listTasks, getTask, createTask, updateTask, deleteTask };
