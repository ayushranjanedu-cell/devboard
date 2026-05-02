import Task from "../models/task.model.js";
import { io } from "../../server.js";

export const getAllTasks = async(req,res,next)=>{
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }catch(error){
        next(error);
    }
};

export const getTaskById = async(req,res,next)=>{
    try{
        const task = await Task.findById(req.params.id);
        if(!task){
           return res.status(404).json({error:'Task not found'});
        }
        res.status(200).json(task);
    }catch(error){
        next(error);
    }
};

export const createTask = async(req,res,next)=>{
    try{
        const {title,description,status}=req.body;
        const task = await Task.create({title,description,status});

        io.emit('task:created', task);

        res.status(201).json(task);
    }catch(error){
       next(error);
    }
};

export const updateTask = async(req,res,next)=>{
    try{
        const task = await Task.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new:true,runValidators:true}
        );
        if(!task){
           return res.status(404).json({error:'Task not found'});
        }

        io.emit('task:updated',task);
        res.status(200).json(task);
    }catch(error){
        next(error);
    }
};

export const deleteTask = async(req,res,next)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({error:'Task not found'});
        
        }
        io.emit('task:deleted',{id:req.params.id});
        res.status(200).json({message:'Task deleted successfully'});
    }catch(error){
        next(error);
    }
};
