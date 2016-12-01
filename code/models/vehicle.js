var mongoose = require('mongoose');
const Account = require('./account');
var Schema = mongoose.Schema;

var VehicleSchema = new Schema({
    name: String,
    model: String,
    type: String,
    owner: [{type: Schema.Types.ObjectId, ref: 'Account'}],
    ecv: String,
    vin: String,
});

var Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;