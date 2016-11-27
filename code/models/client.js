var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Client = new Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    email: String
});


module.exports = mongoose.model('Client', Client);