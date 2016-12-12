var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Element of an ItemList

var ItemSchema = new Schema({
    name: String,
    est_time: Number,
    est_cost: Number
});

var Item = mongoose.model('Item', ItemSchema);
module.exports = Item;