const HttpError = require("../models/http-error")
const User = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const nodemailer = require('nodemailer')

const getUsers = async (req,res,next)=>{
    let users
    try{
        users = await User.find({},'-password')
    }catch(err){
        return next(new HttpError('No users found !', 401))
    }

    res.status(201).json({users:users.map(user => user.toObject({getters:true}))})

}
const getUser = async (req,res,next) =>{
    let user
    const uid = req.params.uid
 
    try{
        user = await User.findById(uid,'-password')
    }catch(err){
        return next(new HttpError('No users found !', 401))
    }
    if(!user){
        return next(new HttpError('No users found !', 401))
    }
    res.status(201).json({user:user.toObject({getters:true})})
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
        console.log(err)
    }
    console.log("login in")
    res.status(201).json({userId:user.id, email:user.email, token:token})

}

const checkEmail = async (req,res,next) =>{
    const {email, name} = req.body
    console.log(email)
    let hashedCode
    let userEmail,userName
    try{
        try{
            userEmail = await User.findOne({email:email}) 
            userName = await User.findOne({name:name}) 

        }catch(err){
            return next(new HttpError("cant login , please try again "),500)
        }
        if(userEmail || userName){
            return next(new HttpError("the user is already exist"),401)
        }
        const transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port:587 ,
        secure:false,
        auth: {
            user: 'ahmadilawa@gmail.com',
            pass: 'mjvjwjbeguuruszg'
        }
    });
    let code  = parseInt( Math.random()*9).toString() + 
    parseInt( Math.random()*9).toString()+ 
    parseInt( Math.random()*9).toString()+
    parseInt( Math.random()*9).toString()
    hashedCode = await  bcrypt.hash(code, 12)
    console.log(hashedCode)
    const info = await transporter.sendMail({
        from:'Freelacne@gamil.com',
        to:email,
        subject:'Freelance',
        text:'Your Freelance verification code is ' +code
    })}catch(err){
        return next(new HttpError(err,401))
    }
    if(!hashedCode){
        return next(new HttpError('try again ',401))
    }
    res.status(201).json({code:hashedCode})
}
const signup = async  (req,res,next)=>{
    const {name, email, password, hashedCode, code} = req.body
    console.log(name )

    let userEmail,userName
    try{
        if(!await bcrypt.compare(code,hashedCode)){
            return next(new HttpError("try again , the code incorrect"),500)
            
        }
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
        image:req.file.path,
        products:[]
    })
    let token 
    try{
        token = jwt.sign(
        {userId:user.id, email:user.email},
        process.env.appToken,
        {expiresIn:'2h'}
        )
    }catch(err){

    }
    try{
        await user.save()
        const transporter =  nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port:587 ,
            secure:false,
            auth: {
                user: 'ahmadilawa@gmail.com',
                pass: process.env.emailPassword
            }
            //  
        })
        const info = await transporter.sendMail({
            from:'Freelacne@gamil.com',
            to:email,
            subject:'Wlecome',
            text:'We done , wlecome to Freelance ' 
        })
        
    }catch(err){
        return next(new HttpError(err.message,401))
    }
    res.status(201).json({userId:user.id, email:user.email, token:token})
}

exports.getUsers = getUsers
exports.login = login
exports.signup = signup
exports.checkEmail = checkEmail
exports.getUser = getUser