const { Responses } = require("../helpers");
const { TaskService, UserService } = require("../services");
const config = require('../config');
const jwt = require('jsonwebtoken');


async function GetDashboard(req, res, next){
    const { user } = req;

    try{
        const taskList = await TaskService.GetTasksForUser(user._id);
        const taskCompleted = await TaskService.GetCountWithCondition(user._id, { is_complete: true, is_deleted: false })
        const totalTask = taskList.length
        return res.send(Responses.SuccessResponse({
            totalTask,
            taskCompleted,
            allTasks: [...taskList],
            latestTasks: taskList.splice(0,3),
        }))
        
    }catch(error){
        console.log("Error while fetching dashboard: ", error);
        const errorRes = Responses.ErrorResponse(error)
        res.status(errorRes.code).send(errorRes);
    }
}

async function AuthenticateUser(req, res, next){
    const { name, user_id } = req.body;
    console.log(req.body, "Request for Login")
    const { SECRETE_KEY } = process.env;
    const ERROR_CODE = 400;

    if(!user_id) return res.status(ERROR_CODE).send( Responses.ErrorResponse({}, 400, "User ID is Mandatory Field") );
    if(!name) return res.status(ERROR_CODE).send( Responses.ErrorResponse({}, 400, "Name is Mandatory Field") );

    try{
        const user = await UserService.GetUserByField({ "name": name.toLowerCase(), user_id });
        if(!user) return res.status(ERROR_CODE).send( Responses.ErrorResponse({}, 400, "user not find") );
        const token = jwt.sign({ user_id: user._id }, SECRETE_KEY, { expiresIn: '24h' });
        return res.send({ token, user });

    }catch(error){
        console.log("Error while Login: ", error);
        const errorRes = Responses.ErrorResponse(error)
        return res.status(errorRes.code).send(errorRes);
    }
}

module.exports = {
    GetDashboard,
    AuthenticateUser,
}