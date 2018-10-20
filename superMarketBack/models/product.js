var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = new Schema({
    name:String,
    category:String,
    quantity:Number,
    image:String,
    price:Number
});
module.exports = mongoose.model('Product', Product);