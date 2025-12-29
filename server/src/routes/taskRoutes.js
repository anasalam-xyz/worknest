import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createTask, getProjectTasks, getMyTasks, updateTask, deleteTask } from '../controllers/taskController.js';

const router = Router();
router.use(authMiddleware);

router.get('/my/:projectId', getMyTasks);
router.post('/project/:projectId', createTask);
router.get('/project/:projectId', getProjectTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;