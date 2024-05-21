const mongooose = require('mongoose')

const productSchema = new mongooose.Schema({
    productname:{
        type: String,
    },
    productquantity:{
        type: Number,
    },
    productprice:{
      type: Number,  
    }
},{timestamps: true})

const product = mongooose.model('product', productSchema);

module.exports = product;