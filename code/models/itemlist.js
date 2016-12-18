var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// List of Items used in the 'message basket'

var ItemListSchema = new Schema({
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
});

var ItemList = mongoose.model('ItemList', ItemListSchema);
module.exports = ItemList;
