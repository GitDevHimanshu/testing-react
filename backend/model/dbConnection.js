const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config()

const dbConnection = () =>{
    mongoose.connect("mongodb+srv://himanshu:himanshu123@cluster.xesxrtm.mongodb.net/?retryWrites=true&w=majority&appName=cluster")
        .then((database) =>{console.log('database connected'+ database)})
        .catch((error)=>{console.log(error)})
}

module.exports = dbConnection
