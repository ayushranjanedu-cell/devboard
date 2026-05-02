import express from 'express';
import { getAllTasks,getTaskById,createTask,updateTask,deleteTask } from '../controllers/tasks.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { taskValidator } from '../middleware/validators.js';
import { validate } from '../middleware/validate.middleware.js';

const router = express.Router();

router.get('/',protect,getAllTasks);
router.get('/:id',protect,getTaskById);
router.post('/',protect,taskValidator,validate,createTask);
router.put('/:id',protect,taskValidator,validate,updateTask);
router.delete('/:id',protect,deleteTask);

export default router;

