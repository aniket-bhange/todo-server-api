const { User } = require('../schema');

async function GetUser(id){
    return new Promise((resolve, reject)=> {
        User.findOne({ _id: id }, function(error, task){
            if(error) return resolve(null);
            resolve(task)
        })    
    })
}

async function GetUserByField(fields) {
    return new Promise((resolve, reject)=> {
        User.findOne(fields, function(error, task){
            if(error) return resolve(null);
            resolve(task)
        })    
    })
}

async function Update(id, details){
    
    return new Promise((resolve, reject)=> {
        User.findByIdAndUpdate(id, details, (error, result)=> {
            if(error) return reject(error)
            return resolve(result);
        })
    })
}



module.exports = {
    Update,
    GetUser,
    GetUserByField
}