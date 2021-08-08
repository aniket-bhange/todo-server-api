const {TaskService, UserService} = require('../services');
const { Responses } = require('../helpers');

async function Create(req, res, next){
    const { body, user } = req;

    try{
        console.log(user, "logged In User");
        const task = await TaskService.CreateTask({ name: body.name, create_by: user._id });
        console.log("new Task is inserted");
        return res.send(Responses.SuccessResponse({
            id: task
        }))
    }catch(error){
        const errorRes = Responses.ErrorResponse(error)
        console.log("Error Occured While creting Task", errorRes)
        res.status(errorRes.code).send(errorRes)
    }
}

async function Update(req, res, next){
    let { body, user } = req;
    const { id } = req.params;
    if(!id) return res.send(Responses.SuccessResponse({}, null, "No task was found, Send correct Id"))
    try{
        const oldTask = await TaskService.GetTask(id);
        if(!oldTask) return res.send(Responses.SuccessResponse({}, null, "No task was found, Send correct Id"))
        if(oldTask.is_deleted){
            const errorRes = Responses.ErrorResponse({ error_message: "Task is already delete cannot be edited" })
            return res.status(errorRes.code).send(errorRes)
        }
        const task = await TaskService.EditTask(id, body);
        console.log("Task is Updated")
        return res.send(Responses.SuccessResponse(task))
    }catch(error){
        const errorRes = Responses.ErrorResponse(error)
        console.log("Error Occured While creting Task", errorRes)
        res.status(errorRes.code).send(errorRes)
    }
}

async function Delete(req, res, next){
    let { body, user } = req;
    const { id } = req.params;
    if(!id) return res.send(Responses.SuccessResponse({}, null, "No task was found, Send correct Id"))

    try{
        const oldTask = await TaskService.GetTask(id);
        if(oldTask.is_deleted) return res.send(Responses.SuccessResponse(oldTask));

        body = { is_deleted : true };
        const task = await TaskService.EditTask(id, body);
        console.log("Task is Deleted")
        return res.send(Responses.SuccessResponse(task))
    }catch(error){
        const errorRes = Responses.ErrorResponse(error)
        console.log("Error Occurred While updating Task", errorRes)
        res.status(errorRes.code).send(errorRes)
    }
    
}

async function GetAll(req, res, next){
    let { user } = req;
    try{
        const allTask = await TaskService.GetTasksForUser(user._id);
        if(!allTask.length){
            return res.send(Responses.SuccessResponse([], null, "No task was found, For current user"))
        }
        console.log("Task is Found", allTask)
        return res.send(Responses.SuccessResponse(allTask))
    }catch(error){
        const errorRes = Responses.ErrorResponse(error)
        console.log("Error Occured While finding Task", errorRes)
        res.status(errorRes.code).send(errorRes)
    }
}


module.exports = {
    Create,
    Update,
    GetAll,
    Delete
}