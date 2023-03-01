const HttpError = require("../models/http-error")
const Product = require("../models/product")
const User = require('../models/user')
const mongoose = require("mongoose")
const Tag = require("../models/tag")
const getProducts = async (req, res, next) => {
    let products
    try {
        products = await Product.find({})
    } catch (err) {
        return next(new HttpError("could not found any product ", 401))
    }

    res.status(201).json({ products: products.map(product => product.toObject({ getters: true })) })
}


const getMostPopularProducts = async (req, res, next) => {
    let products
    try {
        products = await Product.find({}).sort('-hearts')
    } catch (err) {
        return next(new HttpError("could not found any product ", 401))
    }

    res.status(201).json({ products: products.map(product => product.toObject({ getters: true })) })
}

const getTopSalesProducts = async (req, res, next) => {
    let products = []

    try {
        products = await Product.find({}).sort('-downloads')
    } catch (err) {
        return next(new HttpError("could not found any product ", 401))
    }

    res.status(201).json({ products: products.map(product => product.toObject({ getters: true })) })
}



const getMostPopular = async (req, res, next) => {
    let products
    let user
    try {
        products = await Product.find({}).sort('-hearts')
        user = await User.findById(products[0].owner)
    } catch (err) {
        return next(new HttpError("could not found any product ", 401))
        
    }

    res.status(201).json({ product: products[0].toObject({ getters: true }), user: user.toObject({ getters: true }) })
}

const getProduct = async (req, res, next) => {
    let product
    const pid = req.params.pid
    try {
        product = await Product.findById(pid)
    } catch (err) {
        return next(new HttpError("could found the product ", 401))
    }
    if (!product) {
        return next(new HttpError("could found the product ", 401))
    }
    res.status(201).json({ product: product.toObject({ getters: true }) })
}

const searchProduct = async (req, res, next) => {
    let fillteredProducts = []

    let { productName } = req.body
    if (productName != "")
        try {
            let tag = await Tag.findOne({ tagName: { $regex: productName } })
            fillteredProducts = await Product.find({ $or: [{ tags: tag }, { productName: { $regex: productName } }] })

        } catch (err) {
            return next(new HttpError("could found the product ", 401))
        }
    res.status(201).json({ products: fillteredProducts.map(product => product.toObject({ getters: true })) })

}

const createProduct = async (req, res, next) => {


    const { productName, tags, description, ownerId, price } = req.body

    let user
    try {
        user = await User.findById(ownerId)
    } catch (err) {
        return next(new HttpError("could not to upload the product , please try again later"))
    }
    if (!user) {
        return next(new HttpError("could not to upload the product , please try another user"))
    }
    let tg = []
    for (let i = 0; i < tags.length; i++) {
        try {
            let tag = await Tag.find({ _id: tags[i] })
            tg.push(tag)
        } catch (err) {

        }

    }
    let tag
    try {
        tag = await Tag.find({ _id: { $in: tags } }, 'id')
    } catch (err) {

    }
    if (!tag) {
        return next(new HttpError("could not to upload the product , add at least one tag"))
    }
    const product = new Product({
        productName: productName,
        description: description,
        price: price,
        owner: user.id,
        tags: tag,
        file: req.files[0].path,
        image: req.files.map(item => item.path).filter((item, index) => index != 0),
        createdDate: new Date(),
        fileSize: req.files[0].size
    })

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await product.save({ session: sess })

        await user.products.push(product)
        await user.save({ session: sess })

        await sess.commitTransaction()

    } catch (err) {
        console.log(err)
    }
    res.status(201).json({})
}

const deleteProduct = async (req, res, next) => {
    const pid = req.params.pid
    console.log(pid)
    let product
    let user    
    try {
        product = await Product.findById(pid)
        user = await User.findOne(product.owner)
    } catch (err) {

    }
    if (!product) {
        return next(new HttpError("no product with this id", 401))
    }
    if (req.userData.userId !== user.id) {
        return next(new HttpError("You are not allowed to delete this product ", 401))
    }
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await product.remove({ session: sess })

        await user.products.pull(product)
        await user.save({ session: sess })

        await sess.commitTransaction()

    } catch (err) {
        console.log(err)
    }
    res.status(201).json({})

}


const updateProduct = async (req, res, next) => {
    const pid = req.params.pid
    const { productName, description, tags, price } = req.body
    let product
    let user
    try {
        product = await Product.findById(pid)
        user = await User.findOne(product.owner)
    } catch (err) {

    }
    if (!product) {
        return next(new HttpError("no product with this id", 401))
    }
    if (req.userData.userId !== user.id) {
        return next(new HttpError("You are not allowed to update this product ", 401))
    }

    console.log(productName)
    if (req.files.length != 0 && req.files[0].mimetype == 'application/zip') {
        await product.updateOne({ productName: productName, description, tags, price, file: req.files[0].path, fileSize: req.files[0].size })

    } else {
        await product.updateOne({ productName: productName, description, tags, price })
    }
    res.status(201).json({ name: product.name, description: product.description })

}


const deleteAllProduct = async (req, res, next) => {


    try {

        await Product.deleteMany({})

        await User.deleteMany({})


    } catch (err) {
        console.log(err)
    }
    res.status(201).json({})

}


const heartCheck = async (req, res, next) => {
    const pid = req.params.pid
    let product
    let user
    const { userId } = req.body
    try {
        product = await Product.findById(pid)
        user = await User.findById(userId)

    } catch {
        console.log('err')
        return next(new HttpError("no product with this id ", 401))

    }
    if (!product) {
        return next(new HttpError("no product with this id ", 401))
    }
    if (!user) {
        console.log(user)
        return next(new HttpError("no user with this id ", 401))

    }


    let isInProduct = await product.heartsUsers.includes(userId)
    if (isInProduct) {
        await product.heartsUsers.remove(user)

        product.hearts -= 1

        await product.save()
    } else {
        await product.heartsUsers.push(user)

        product.hearts += 1
        await product.save()
    }


}


exports.getProducts = getProducts
exports.deleteProduct = deleteProduct
exports.updateProduct = updateProduct

exports.createProduct = createProduct

exports.searchProduct = searchProduct
exports.getProduct = getProduct
exports.getMostPopular = getMostPopular
exports.getMostPopularProducts = getMostPopularProducts
exports.getTopSalesProducts = getTopSalesProducts

exports.deleteAllProduct = deleteAllProduct
exports.heartCheck = heartCheck