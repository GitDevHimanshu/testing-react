const mongoose = require('mongoose');
const users = require("../model/userSchema")


// module.exports.getHome = (req, res) =>{
//     res.sendFile(__dirname+"../../client/index.html");
// }


// module.exports.authCheck = (req, res)=>{
//     console.log(req.session)
//     if(req.session.isLoggedIn){
//         res.status(200).json(true)
//     } else {
//         res.status(200).json(false) 
//     }
// }

module.exports.signupPost = async (req, res) =>{
    const exist = await users.find({username:req.body.username});
    if(exist.length === 0){
        const user = await users.create({
           name: req.body.name,
           username: req.body.username,
           password: req.body.password
        })
        await user.save();
        res.status(200).json({data: req.body});
    } else {
        res.status(301).json({error: "user already exist"})
    }
}

module.exports.loginPost = async (req, res) =>{
    
    const username = await users.find({username: req.body.username})
    if(username.length !== 0){
        if(username[0].password === req.body.password){
            req.session.isLoggedIn = true;
            res.status(200).json({msg: "success login"})
        } else {
            res.status(401).json({msg: "incorrect password"})
        }
    } else {
        res.status(404).json({msg: "username does not exist"})
    }
}


module.exports.logoutPost = (req, res) =>{
    try{
        req.session.loggedin = false;
        res.status(200).json(true);
    } catch {
        res.status(500).json(false);
    }
}

