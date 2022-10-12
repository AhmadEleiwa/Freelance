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

const getMostPopular= async(req,res,next)=>{
    let products 
    let user
    try{
        products = await Product.find({}).sort('-hearts')
        user = await User.findById(products[0].owner)
    }catch(err){
        return next(new HttpError("could not found any product ", 401))
    }
    
    res.status(201).json({product:products[0].toObject({getters:true}),user:user.toObject({getters:true})})
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
    let fillteredProducts = []
    
    const {productName} = req.body
    if(productName != "")
    try{
        let products = await Product.find({})
        for(let i=0; i< products.length ;i++){
            if(productName === products[i].productName){
                fillteredProducts.push(products[i])
            }
            else if(products[i].productName.search(productName) != -1){
                fillteredProducts.push(products[i])
            }
            else{
                let words = productName.split(" ")
                let searchProduct = products[i].productName.split(" ")
                let c = 0
                for(let j=0; j<words.length; j++){
                    if(j >= searchProduct.length)
                        break
                    if(words[c] === searchProduct[j]){
                            c+=1
                        }
                    }
                    if(searchProduct.length==2 && c/searchProduct.length >= 0.50){
                        fillteredProducts.push(products[i])
                    }
                    else if ( c/searchProduct.length >= 0.70){
                        fillteredProducts.push(products[i])
                    }
            }
        }
    }catch(err){
        return next(new HttpError("could found the product ", 401))
    }
    res.status(201).json({products:fillteredProducts.map(product => product.toObject({getters:true}))})

}

const createProduct  = async (req,res,next)=>{

  
    const {productName, description, ownerId} = req.body
    console.log(ownerId)
    let user
    try{
        user = await User.findById(ownerId)
    }catch(err){
        return next(new HttpError("could not to upload the product , please try again later"))
    }
    if(!user){
        return next(new HttpError("could not to upload the product , please try another user"))
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
exports.getMostPopular = getMostPopular
