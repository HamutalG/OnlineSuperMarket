var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Order = new Schema({
    customerId: String,
    city: String,
    street: String,
    shippingDate: Date,
    updatedAt: Date,
    last4Digits: Number,
    total: Number,
    productsBought: Array
});
module.exports = mongoose.model('Order', Order);