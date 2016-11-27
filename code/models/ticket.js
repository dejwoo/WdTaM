var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Status = require('../models/status');
var Client = require('../models/client');

var Ticket = new Schema({
    user: Client.schema,
    date: Date,
    text: String,
    images: [String],
    status: Status.schema
});

module.exports = mongoose.model('Ticket', Ticket);