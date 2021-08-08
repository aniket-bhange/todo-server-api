const { getID, MongoClient } = require('../config');
const { Task } = require('../schema');

function PopulateTaskFields({ name, create_by }){

    const task = new Task();
    task._id = getID()
    task.name = name;
    task.created_by = getID(create_by);
    return task;
}

function getTask(id){
    return new Promise((resolve, reject)=> {
        Task.findOne({ _id: id }, function(error, task){
            if(error) return resolve(null);
            resolve(task)
        })    
    })
}


async function CreateTask(taskDef){
    // await MongoClient.connect
    const newTask = PopulateTaskFields(taskDef);
    console.log(JSON.stringify(newTask), "New Task for creation")
    return new Promise((resolve, reject)=>{
        newTask.save((error)=>{
            if(error) return reject(error);
            console.log(newTask._id, "New Task is Created")
            resolve(newTask._id)
        })
    });
}

function EditTask(id, taskDef){
    const conditions = { _id: id }
    return new Promise((resolve, reject)=> {
        Task.findOneAndUpdate(conditions, taskDef, async function(error, result){
            if(error) return reject(error)
            console.log("Result:", result)
            const task = await getTask(id);
            console.log("After Task updated:", task);
            return resolve(task)
        })
    })
}

function GetTasksForUser(userID){
    return new Promise((resolve, reject)=> {
        Task.find({ created_by: userID, is_deleted: false }).sort({ create_at: -1 }).exec(function(error, task){
            if(error) return reject(error);
            resolve(task)
        })    
    })
}

function GetCountWithCondition(userID, condition={}){
    return new Promise((resolve, reject)=> {
        Task.countDocuments({ created_by: userID, ...condition }, function(error, task){
            if(error) return reject(error);
            resolve(task)
        })    
    })
}


module.exports = {
    CreateTask,
    EditTask,
    GetTask: getTask,
    GetTasksForUser,
    GetCountWithCondition
}