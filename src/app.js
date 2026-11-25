const express = require('express');
const config = require('./config');
const requestLogger = require('./middlewares/requestLogger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const healthRoutes = require('./routes/health.routes');
const tasksRoutes = require('./routes/tasks.routes');

const app = express();

app.use(express.json());
if (config.env !== 'test') app.use(requestLogger);

app.get('/', (req, res) => {
  res.json({ name: config.appName, docs: 'See README.md for the API reference' });
});
app.use('/health', healthRoutes);
app.use('/api/v1/tasks', tasksRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
