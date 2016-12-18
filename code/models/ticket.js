var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'Account'},
    mechanic: {type: Schema.Types.ObjectId, ref: 'Account'},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    status: {type: Schema.Types.ObjectId, ref: 'Status'},
    title: String
});

var Ticket = mongoose.model('Ticket', TicketSchema);
module.exports = Ticket;