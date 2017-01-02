var mongoose = require('mongoose');
const Account = require('./account');
var Schema = mongoose.Schema;

var TemplateSchema = new Schema({
    name: String,
    desc: String,
    timestamp: String,
    used: Number
});

var Template = mongoose.model('Template', TemplateSchema);
module.exports = Template;