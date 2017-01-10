var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
const Vehicle = require('./vehicle');

var AccountSchema = new Schema({
    username: String,
    password: String,
    isMechanic: { type: Boolean, default: false },
    email: String,
    firstName: String,
    lastName: String,
    date: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    vehicles: [{type:Schema.Types.ObjectId, ref: 'Vehicle'}]
});

AccountSchema.plugin(passportLocalMongoose);

var Account = mongoose.model('Account', AccountSchema);
module.exports = Account;