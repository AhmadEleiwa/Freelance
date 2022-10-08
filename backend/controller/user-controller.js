const HttpError = require("../models/http-error")
const User = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const getUsers = async (req,res,next)=>{
    let users
    try{
        users = await User.find({},'-password')
    }catch(err){
        return next(new HttpError('No users found !', 401))
    }
    res.status(201).json({users:users.map(user => user.toObject({getters:true}))})

}
const login = async  (req,res,next)=>{
    const {email, password} = req.body

    let user
    try{
        user = await User.findOne({email:email})
    }catch(err){
        return next(new HttpError("cant login , please try again "),500)
    }
    if(!user){
        return next(new HttpError("Invalid credentials, check ur email"),401)
    }

    if(! await bcrypt.compare(password, user.password)){
        return next(new HttpError("Invalid credentials, the password incorrect"),401)
    }
    let token 
    try{
        token = jwt.sign(
        {userId:user.id, email:user.email},
        "app_token",
        {expiresIn:'2h'}
        )
    }catch(err){

    }
    res.status(201).json({userId:user.id, email:user.email, token:token})

}

const signup = async  (req,res,next)=>{
    const {name, email, password} = req.body
    let userEmail,userName
    try{
        userEmail = await User.findOne({email:email}) 
        userName = await User.findOne({name:name}) 
    }catch(err){
        return next(new HttpError("cant login , please try again "),500)
    }
    if(userEmail || userName ){
        return next(new HttpError("the user is already exist"),401)
    }
    let user =  new User({
        name:name,
        password: await bcrypt.hash(password, 12),
        email:email,
        image:"None",
        products:[]
    })
    let token 
    try{
        token = jwt.sign(
        {userId:user.id, email:user.email},
        "app_token",
        {expiresIn:'2h'}
        )
    }catch(err){

    }
    try{
        await user.save()
    }catch(err){
        return next(new HttpError("please try again",401))
    }
    res.status(201).json({userId:user.id, email:user.email, token:token})
}

exports.getUsers = getUsers
exports.login = login
exports.signup = signup