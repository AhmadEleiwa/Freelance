const HttpError = require('../models/http-error')
const Tag = require('../models/tag')

const getTags= async (req,res,next) =>{
    let tags
    try{
        tags = await Tag.find({})
    }catch(err){
        return next(new HttpError("No tags Found !",401))
    }

    res.status(201).json({tags:tags.map(tag => tag.toObject({getters:true}))})
}

exports.getTags = getTags