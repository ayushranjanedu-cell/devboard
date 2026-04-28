import express from 'express';
import taskRoutes from './routes/tasks.routes.js';
import logger from './middleware/logger.js';
const app=express();
app.use(express.json());
app.use(logger);
app.use('/api/tasks',taskRoutes);
export default app;
