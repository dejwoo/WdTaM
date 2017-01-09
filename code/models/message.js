const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence');
const Account = require('./account');
const Ticket = require('./ticket');
const Item = require('./item');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    autor: {type: Schema.Types.ObjectId, ref: 'Account'},
    ticket: {type: Schema.Types.ObjectId, ref: 'Ticket'},
    items: {type: Schema.Types.ObjectId, ref: 'Item'},
    subject: String,
    text: String,
    creation_date: Date,
    images: [String],
    messageNo: Number,
    templates: [{type: Schema.Types.ObjectId, ref: 'Template'}]
    additionalInfo: [{type: Schema.Types.ObjectId, ref: 'Template'}]
});

//Auto increment each new message in ticket thread
MessageSchema.plugin(AutoIncrement, {id: 'messageSeq',inc_field: 'messageNo', reference_fields:['ticket']});

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;