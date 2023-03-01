const mongoose = require('mongoose')
const unique = require('mongoose-unique-validator')


const Schema = mongoose.Schema

const productSchema = Schema({
    productName :{type:String, required:true},
    description: {type:String, required:true},
    file: {type:String, required: true},
    image: [{type:String, required: true}],
    hearts: {type:Number, default:0},
    heartsUsers : [{type:mongoose.Types.ObjectId, ref:'User'}], 
    downloads: {type:Number, default:0},
    price: {type:Number, default:0},
    totalEarns: {type:Number, default:0},
    owner: {type:mongoose.Types.ObjectId,required:true, ref:'User'},
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    createdDate:{type:Date},
    fileSize:{type:Number}

})


productSchema.plugin(unique)

module.exports = mongoose.model('Product', productSchema)