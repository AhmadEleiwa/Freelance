const HttpError = require("../models/http-error");
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) =>{
   if(req.method === "OPTIONS"){
      return next()
   }
   try{
      const token = req.headers.authorization.split(" ")[1];
     if(!token){
        throw new Error("authorization failed")
     }
     const decodedToken = jwt.verify(token, 'app_token') 
     console.log(decodedToken.userId)
     req.userData  = {userId: decodedToken.userId}
     next()
 }catch(err){
    return next(new HttpError("authorization failed", 401))
 }

}