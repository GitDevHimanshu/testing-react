const mongooose = require('mongoose')

const userSchema = new mongooose.Schema({
    name:{
        type: String,
    },
    username:{
        type: String,
    },
    password:{
      type: String,  
    }
},{timestamps: true})

const user = mongooose.model('user', userSchema);

module.exports = user;