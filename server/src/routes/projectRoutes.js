import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getUserProjects, getProjectById, createProject, joinProject, updateProject, deleteProject } from '../controllers/projectController.js'

const router = Router();
router.use(authMiddleware);

router.post('/', createProject);
router.get('/', getUserProjects);
router.post('/join', joinProject);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;