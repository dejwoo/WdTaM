var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatusSchema = new Schema({
    name: String
});

var Status = mongoose.model('Status', StatusSchema);
module.exports = Status;

/*var status_list = [];
 var statuses = [{name: "New"}, {name: "In Progress"}, {name: "Pending Customer"}, {name: "Pending Vendor"}, {name: "Pending Maintenance"}, {name: "Transferred"}, {name: "Solved"}, {name: "Closed"}];
 for (var i = 0; i < statuses.length; i++) {
 status_list.push(Status({name: statuses[i].name}));
 status_list[status_list.length - 1].save(function (err) {
 if (err) throw err;
 console.log('User saved successfully!');
 });
 }
 */
