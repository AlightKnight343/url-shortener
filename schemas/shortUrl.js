const mongoose = require("mongoose")
const shortId = require("shortid")


const reqString = {
    type: String,
    required:true
}


const  shortUrlSchema = new mongoose.Schema({
    big:reqString,
    smol:{
        type:String, 
        required:true,
        default: shortId.generate
    },
    date:{
        type:String,
        default:Date.Now
    }
})

module.exports = mongoose.model('shortUrl', shortUrlSchema)