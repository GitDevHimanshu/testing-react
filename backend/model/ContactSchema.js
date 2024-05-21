const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    message:{
        type:String,
    }
},{timestamps:true})

const contact = mongoose.model("contactus",contactSchema);

module.exports = contact;