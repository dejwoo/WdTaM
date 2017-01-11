const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Account = require('./account');
const Status = require('./status');
const Message = require('./message');
const Vehicle = require('./vehicle');
const Template = require('./problem_template');
const AdditionalInfo = require('./additionalInfo');

const TicketSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'Account'},
    mechanic: {type: Schema.Types.ObjectId, ref: 'Account'},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    status: {type: Schema.Types.ObjectId, ref: 'Status'},
    title: String,
    creation_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    vehicle: {type: Schema.Types.ObjectId, ref: 'Vehicle'},
    templates: [{type: Schema.Types.ObjectId, ref: 'Template'}],
    additionalInfo: String
});

TicketSchema.methods.appendMessage = function (messageData, cb) {
    messageData._ticket = this._id;
    let message = Message(messageData);
    message.save((err, data) => cb(err, data));
    this.messages.push(message._id);
    return this.save((err, data)=>{cb(err, data)})
};

TicketSchema.statics.createTicket = function (ticketData, messageData, cb) {
    let ticket = new this(ticketData, (err) => cb(err));
    ticket.save((err, data) => {
        if (err) return cb(err);
        if (messageData) {
            return ticket.appendMessage(messageData, cb);
        }
        cb(err,data);
    });
};

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;

