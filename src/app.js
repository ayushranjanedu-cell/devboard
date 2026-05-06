import express from 'express';
import helmet from 'helmet';
import {rateLimit} from 'express-rate-limit';
import taskRoutes from './routes/tasks.routes.js';
import logger from './middleware/logger.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const limiter = rateLimit({
    windowMs:15*60*1000, //15 minutes
    max: 100,//max 100 request per 15 min per IP
    message:{
        error:'Too many request for this IP,please try again after 15 minutes!'
    }
});

const authLimiter = rateLimit({
    windowMs:15*60*1000,
    max:10, //only 10 login attempt per 15 minutes
    message:{
        error:'Too many login attempts,please try again after 15 minutes!'
    }
});

const app=express();
app.use(helmet());
app.use(express.json());
app.use(logger);
app.use(limiter);

app.use('/api/auth',authRoutes);    
app.use('/api/tasks',taskRoutes);
app.use(express.static('public'));

// Global error handler — MUST be last
app.use(errorHandler);
export default app;




