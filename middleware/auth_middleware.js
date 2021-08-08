const { Responses } = require("../helpers");
const { UserService } = require("../services");
const jwt = require('jsonwebtoken');

async function AuthMiddleware(req, res, next) {
    console.log('Time: ', Date.now())
    // const id = "610e1c5091a1d272f8c4bcb1";
    const token = req.header('Authorization');
    console.log(token, "Token from User");
    const { SECRETE_KEY } = process.env;
    try{
        const decoded = jwt.verify(token, SECRETE_KEY);
        console.log(decoded, "Decoded from User");
        const user = await UserService.GetUser(decoded.user_id);
        if(!user){
            let err = Responses.ErrorResponse(error);
            return res.status(err.code).send(err);
        }
        req.user = user;
        next();
    }catch(error){
        let err = Responses.ErrorResponse("Token Expired", 401);
        return res.status(err.code).send(err)
    }
}

exports.AuthMiddleware = AuthMiddleware;