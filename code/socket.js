var socket_io = require('socket.io');
const Vehicle = require('./models/vehicle');
const Template = require('./models/problem_template');

var io = new socket_io();
var socketApi = {};

socketApi.io = io;

module.exports = socketApi;