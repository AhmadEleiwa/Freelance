const mongoose = require('mongoose')
const unique = require('mongoose-unique-validator')


const Schema = mongoose.Schema

const tagSchema = Schema({
    tagName:{type:String, unique:true,required:true},
    tagDescription:{type:String,required:true},
    image:{type:String},

})


tagSchema.plugin(unique)

module.exports = mongoose.model('Tag', tagSchema)