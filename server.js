import 'dotenv/config';
import {createServer} from 'http';
import { Server } from 'socket.io';
import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

// attach socket.io with http server
const io = new Server(httpServer,{
    cors:{
        origin:'*',
        method:['GET','POST']
    }
});

// socket.io connection handler
io.on('connection',(socket)=>{
    console.log(`User connected: ${socket.id}`);
    socket.on('disconnect',()=>{
        console.log(`User disconnected: ${socket.id}`);
    });
});

export{io};

connectDB().then(()=>{
    httpServer.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
});