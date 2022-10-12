const HttpError = require('../models/http-error')
const Tag = require('../models/tag')
// const init = (req,res,next) =>{
//     const tags =[
//         {
//             'tagName':'3D Model',
//             'tagDescription':'object in three dimensions',
//             'image':'3DModel.jpg'
//         },
//         {
//             'tagName':'2D Art',
//             'tagDescription':'Arts in two dimensions',
//             'image':'2DArt.jpg'
//         },
//         {
//             'tagName':'Design',
//             'tagDescription':'Didgital arts , logo ',
//             'image':'Design.jpeg'
//         },
//         {
//             'tagName':'2D Animation',
//             'tagDescription':'2D animation ',
//             'image':'2DAnimation.jpg'
//         },
//         {
//             'tagName':'Web Designing',
//             'tagDescription':'Create web sites',
//             'image':'WebDesigning.jpg'
//         }
//     ]

//     for(let i=0; i<tags.length; i++){
//         let tag = new Tag(tags[i])
//         tag.save()
//     }
// }

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