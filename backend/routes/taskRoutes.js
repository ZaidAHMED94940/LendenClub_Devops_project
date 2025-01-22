const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');

router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.get('/tasks/export', taskController.exportTasksToExcel);

module.exports = router;
