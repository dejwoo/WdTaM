
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String,
    isMechanic: { type: Boolean, default: false },
    email: String,
    firstName: String,
    lastName: String,
    date: { type: Date, default: Date.now }
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);