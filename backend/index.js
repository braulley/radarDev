const express = require('./server')
const http =  require('http');
const { setupWebSocket } = require('./websocket')
const server = http.Server(express);

setupWebSocket(server);

server.listen(3000);