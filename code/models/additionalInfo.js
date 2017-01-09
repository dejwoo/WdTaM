var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AdditionalInfoSchema = new Schema({
    desc: String,
    image: String,
    video: String,
    rec: String
});
var AdditionalInfo = mongoose.model('AdditionalInfo', AdditionalInfoSchema);
module.exports = AdditionalInfo;