import express from 'express';
import taskRoutes from './routes/tasks.routes.js';
import logger from './middleware/logger.js';
import authRoutes from './routes/auth.routes.js';
const app=express();
app.use(express.json());

app.use(logger);

app.use('/api/auth',authRoutes);    
app.use('/api/tasks',taskRoutes);
app.use(express.static('public'));
export default app;
