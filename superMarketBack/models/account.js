var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Account = new Schema({
    ID: String,
    username: String,
    password: String,
    city: String,
    street: String,
    firstName: String,
    lastName: String
});
Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account);