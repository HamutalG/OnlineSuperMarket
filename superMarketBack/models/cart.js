var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Cart = new Schema({
    customerID:String,
    products:Array,
    cartDate:String,
    totalPrice:Number,
    isClosed:Boolean
});
module.exports = mongoose.model('Cart', Cart);