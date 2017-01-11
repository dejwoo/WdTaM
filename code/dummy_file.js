const moment = require('moment');
let temp_date = moment(new Date('1.12.2016'));
let tickets = [
    {
        name: 'Jozo',
        title: 'Critical car malfunction',
        messages: [{subject: "Re:Re:Tckt1", creation_date: temp_date.subtract(1, 'day')}],
        id: 0,
        status: {name: 'Pending Customer', rank: 2}
    },
    {
        name: 'John',
        title: 'Critical car malfunction',
        messages: [{subject: "Re:Tckt8", creation_date: temp_date.subtract(5, 'day')}],
        id: 1,
        status: {name: 'In Progress', rank: 3}
    },
    {
        name: 'Jake',
        title: 'Critical car malfunction',
        messages: [{subject: "Re:Re:Re:Tckt3", creation_date: temp_date.subtract(2, 'day')}],
        id: 2,
        status: {name: 'Pending Maintenance', rank: 2}
    },
    {
        name: 'Jenny',
        title: 'Critical car malfunction',
        messages: [{subject: "Re:Re:Tckt6", creation_date: temp_date.subtract(33, 'day')}],
        id: 3,
        status: {name: 'Closed', rank: 2}
    },
    {
        name: 'Julien',
        title: 'Critical car malfunction',
        messages: [{subject: "Re:Re:Re:Re:Tckt4", creation_date: temp_date.subtract(9, 'day')}],
        id: 4,
        status: {name: 'Solved', rank: 2}
    },
    {
        name: 'James',
        title: 'Critical car malfunction',
        messages: [{subject: "Re:Re:Tckt5", creation_date: temp_date.subtract(11, 'day')}],
        id: 5,
        status: {name: 'Pending Vendor', rank: 2}
    },
    {
        name: 'Jano',
        title: 'Minor car malfunction',
        messages: [{subject: "Tckt1", creation_date: temp_date.subtract(0, 'day')}],
        id: 6,
        status: {name: 'New', rank: 4}
    },
    {
        name: 'Jano',
        title: 'Minor car malfunction',
        messages: [{subject: "Tckt1", creation_date: temp_date.subtract(0, 'day')}],
        id: 7,
        status: {name: 'New', rank: 4}
    },
    {
        name: 'Jano',
        title: 'Minor car malfunction',
        messages: [{subject: "Tckt1", creation_date: temp_date.subtract(0, 'day')}],
        id: 8,
        status: {name: 'New', rank: 4}
    },
    {
        name: 'Jano',
        title: 'Minor car malfunction',
        messages: [{subject: "Tckt1", creation_date: temp_date.subtract(0, 'day')}],
        id: 9,
        status: {name: 'New', rank: 4}
    },
    {
        name: 'Jano',
        title: 'Minor car malfunction',
        messages: [{subject: "Tckt1", creation_date: temp_date.subtract(0, 'day')}],
        id: 10,
        status: {name: 'New', rank: 4}
    },
    {
        name: 'Jano',
        title: 'Minor car malfunction',
        messages: [{subject: "Tckt1", creation_date: temp_date.subtract(0, 'day')}],
        id: 11,
        status: {name: 'New', rank: 4}
    },
    {
        name: 'Jano',
        title: 'Minor car malfunction',
        messages: [{subject: "Tckt1", creation_date: temp_date.subtract(0, 'day')}],
        id: 12,
        status: {name: 'New', rank: 4}
    },
    {
        name: 'Jano',
        title: 'Minor car malfunction',
        messages: [{subject: "Tckt1", creation_date: temp_date.subtract(0, 'day')}],
        id: 13,
        status: {name: 'New', rank: 4}
    },
    {
        name: 'Jano',
        title: 'Minor car malfunction',
        messages: [{subject: "Tckt1", creation_date: temp_date.subtract(0, 'day')}],
        id: 14,
        status: {name: 'New', rank: 4}
    }
];

module.exports = tickets;