export const getAllTasks = (req,res)=>{
    res.status(200).json({message:'Get all tasks'});
};

export const getTaskById = (req,res)=>{
    res.status(200).json({message:`Get task  ${req.params.id}`});
};

export const createTask =(req,res)=>{
    res.status(201).json({message:'Task created',task:req.body});
};

export const updateTask =(req,res)=>{
    res.status(200).json({message:`Task ${req.params.id} updated`});
};

export const deleteTask=(req,res)=>{
    res.status(200).json({message:`Task ${req.params.id} deleted`});
};
