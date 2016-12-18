const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatusSchema = new Schema({
    name: String,
    rank: Number
});

const Status = mongoose.model('Status', StatusSchema);
module.exports = Status;


//Code for populating table of states
/*
var status_list = [];
var statuses = [{name: "New", rank: 4},
    {name: "In Progress", rank: 3},
    {name: "Pending Customer", rank: 2},
    {name: "Pending Vendor", rank: 2},
    {name: "Pending Maintenance", rank: 2},
    {name: "Transferred", rank: 2},
    {name: "Solved", rank: 1},
    {name: "Closed", rank: 0}];
for (var i = 0; i < statuses.length; i++) {
    status_list.push(Status({name: statuses[i].name}));
    status_list[status_list.length - 1].save(function (err) {
        if (err) throw err;
        console.log('Statuses were saved successfully!');
    });
}*/

