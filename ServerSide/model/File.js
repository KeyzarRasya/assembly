const mongoose = require('mongoose')


const fileSchema = mongoose.Schema({
    image:String,
    address:String
})

const FileModel = mongoose.model("files", fileSchema)
module.exports = FileModel