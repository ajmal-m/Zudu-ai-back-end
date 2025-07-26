import express from 'express';
import { getAllTasks, getTaskById, createTask, updateTaskById, deleteTaskById} 
from '../controllers/task.controller.js';
const router = express.Router();

router.get("/", getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTaskById);
router.delete('/:id', deleteTaskById);

export default router;