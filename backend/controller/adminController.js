const mongoose = require("mongoose");
const products = require("../model/productSchema");
const contactus = require("../model/ContactSchema");
const mailer = require('../utils/nodemailer')

module.exports.addProduct = async (req, res) =>{
    let product = await products.create({
        productname: req.body.name,
        productquantity: req.body.quantity,
        productprice: req.body.price,
    })
    await product.save();
    res.status(200).json(product);
}

module.exports.getProduct = async (req, res) =>{
   const product = await products.find();
    res.status(200).json(product);
}

module.exports.deleteProduct = (req, res) =>{
    products.deleteOne({_id: req.body.id})
    .then(()=>{
        products.find().then((data)=>{
            res.status(200).json(data)
        })
    })   
}

module.exports.editProduct = (req, res) =>{
    products.findOneAndUpdate({_id:req.body.id}, {
        productname: req.body.name,
        productquantity: req.body.quantity,
        productprice: req.body.price })
        .then(()=>{
            products.find()
            .then((data)=>res.status(200).json(data));
        })
        
}

module.exports.sendMessage = async (req, res) =>{
    const status = await mailer.sendMail(req.body.email, req.body.name)
    if(status){
        const contactdoc = await contactus.create({
            name : req.body.name ,
            email : req.body.email ,
            message : req.body.message
        })
        await contactdoc.save();
        res.status(200).json(true);
    } else {
        res.status(400).json(false)
    }
}


module.exports.getQueries = async (req, res) =>{
    const data = await contactus.find();
    res.status(200).json(data);
}


module.exports.deleteMessage = (req, res) =>{
    contactus.deleteOne({_id:req.query.id})
        .then(()=>{
            res.status(200).json(true);
        })
}