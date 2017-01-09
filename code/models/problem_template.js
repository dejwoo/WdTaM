var mongoose = require('mongoose');
const Account = require('./account');
var Schema = mongoose.Schema;

var TemplateSchema = new Schema({
    title: String,
    desc: String,
    createdBy: {type: Schema.Types.ObjectId, ref: 'Account'},
    timestamp: String,
    used: Number
});

var Template = mongoose.model('Template', TemplateSchema);
module.exports = Template;