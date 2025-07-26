const express = require('express');
const { getAllTasks, getTaskById, createTask, updateTaskById, deleteTaskById } = require('../controllers/task.controller.js');
const router = express.Router();

router.get("/", getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTaskById);
router.delete('/:id', deleteTaskById);

module.exports = router;