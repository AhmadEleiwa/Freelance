const HttpError = require("../models/http-error")
const Product = require("../models/product")
const User = require('../models/user')
const mongoose  = require("mongoose")
const getProducts = async (req,res, next)=> {
    let products
    try{
        products = await Product.find({})
    }catch(err){
        return next(new HttpError("could not found any product ", 401))
    }

    res.status(201).json({products:products.map(product => product.toObject({getters:true}))})
}

const getProduct = async (req,res,next) =>{
    let product
    const pid = req.params.pid
    try{
        product = await Product.findById(pid)
    }catch(err){
        return next(new HttpError("could found the product ", 401))
    }
    if(!product){
        return next(new HttpError("could found the product ", 401))
    }
    res.status(201).json({product:product.toObject({getters:true})})
}

const searchProduct= async(req,res,next) =>{
    let products
    const {name} = req.body.name
    console.log(name)
    try{
        products = await Product.find()
    }catch(err){
        return next(new HttpError("could found the product ", 401))
    }

    res.status(201).json({products:products.map(product => product.toObject({getters:true}))})

}

const createProduct  = async (req,res,next)=>{
    const {productName, description, ownerId} = req.body

    let user
    try{
        user = await User.findOne(ownerId)
    }catch(err){
        return next(new HttpError("could not to upload the product , please try again later"))
    }
    if(!user){
        return next(new HttpError("could not to upload the product , please try again later"))
    }

    const product = new Product({
        productName: productName,
        description:description,
        owner:user.id,
        file:'sss',
        image:["file", 'ss']
    })
    try{
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await product.save({session:sess})
    
        await user.products.push(product)
        await user.save({session:sess})
    
        await sess.commitTransaction()
   
    }catch(err){
        console.log(err)
    }
    res.status(201).json({})
}

const deleteProduct = async (req,res,next) => { 
    const pid = req.params.pid
    console.log(pid)
    let product
    let user 
    try{
        product = await Product.findById(pid)
        user = await User.findOne(product.owner)
    }catch(err){

    }
    if(!product){
        return next(new HttpError("no product with this id",401))
    }
    if(req.userData.userId !== user.id){
        return next(new HttpError("You are not allowed to delete this product ",401))
    }
    try{
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await product.remove({session:sess})
    
        await user.products.pull(product)
        await user.save({session:sess})
    
        await sess.commitTransaction()
   
    }catch(err){
        console.log(err)
    }
    res.status(201).json({})

}   


const updateProduct = async (req,res,next) => { 
    const pid = req.params.pid
    const {name, description} = req.body
    let product
    let user 
    try{
        product = await Product.findById(pid)
        user = await User.findOne(product.owner)
    }catch(err){

    }
    if(!product){
        return next(new HttpError("no product with this id",401))
    }
    if(req.userData.userId !== user.id){
        return next(new HttpError("You are not allowed to update this product ",401))
    }
    product.name = name
    product.description = description
    res.status(201).json({name:product.name, description:product.description})

}   


exports.getProducts = getProducts
exports.deleteProduct = deleteProduct
exports.updateProduct = updateProduct

exports.createProduct = createProduct

exports.searchProduct = searchProduct
exports.getProduct = getProduct

