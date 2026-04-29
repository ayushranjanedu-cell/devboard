import Task from "../models/task.model.js";


export const getAllTasks = async(req,res)=>{
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

export const getTaskById = async(req,res)=>{
    try{
        const task = await Task.findById(req.params.id);
        if(!task){
           return res.status(404).json({error:'Task not found'});
        }
        res.status(200).json(task);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

export const createTask = async(req,res)=>{
    try{
        const {title,description,status}=req.body;
        const task = await Task.create({title,description,status});
        res.status(201).json(task);
    }catch(error){
        res.status(400).json({error:error.message});
    }
};

export const updateTask = async(req,res)=>{
    try{
        const task = await Task.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new:true,runValidators:true}
        );
        if(!task){
           return res.status(404).json({error:'Task not found'});
        }
        res.status(200).json(task);
    }catch(error){
        res.status(400).json({error:error.message});
    }
};

export const deleteTask = async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!tasks){
            return res.status(404).json({error:'Task not found'});
        
        }
        res.status(200).json({message:'Task deleted successfully'});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
