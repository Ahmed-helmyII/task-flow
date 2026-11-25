const { Router } = require('express');
const controller = require('../controllers/tasks.controller');

const router = Router();

router.get('/', controller.listTasks);
router.post('/', controller.createTask);
router.get('/:id', controller.getTask);
router.patch('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
