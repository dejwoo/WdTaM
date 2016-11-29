var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VehicleSchema = new Schema({
    name: String
});

var Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;