const mongoose = require('mongoose')
const unique = require('mongoose-unique-validator')


const Schema = mongoose.Schema

const userSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  userPoint: {type:Number, default:0},
  products: [{type:mongoose.Types.ObjectId, required:true, ref:'Product'}],
  userRate :{type:Number,default:0}
})


userSchema.plugin(unique)

module.exports = mongoose.model('User', userSchema)