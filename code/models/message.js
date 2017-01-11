const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
const Account = require('./account');
const Item = require('./item');
const Ticket = require('./ticket');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    _ticket: {type: Schema.Types.ObjectId, ref: 'Ticket'},
    author: {type: Schema.Types.ObjectId, ref: 'Account'},
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
    subject: String,
    text: String,
    creationDate: {type: Date, default: Date.now},
    images: [String],
    messageNo: {type: Number, default: 0}
});

//Auto increment each new message in ticket thread
MessageSchema.plugin(AutoIncrement, {id: 'messageSeq', inc_field: 'messageNo', reference_fields: ['_ticket']});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;