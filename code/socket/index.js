'use strict';

function ioEvents(io){

}

const init = function (app) {

    const server = require('http').Server(app);
    const io = require('socket.io')(server);

    io.set('transports', ['websocket']);

    // Allow sockets to access session data
    io.use((socket, next) => {
        require('../session')(socket.request, {}, next);
     });

    ioEvents(io);
    return server;
};

module.exports = init;