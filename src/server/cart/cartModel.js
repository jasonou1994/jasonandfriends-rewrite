const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    cookieId : {type: Number, required : true},
    products : [{
        imageName : String,
        size : String,
        price : Number,
        quantity : Number,
    }],
    status : { type : String, required : true }
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;