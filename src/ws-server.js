const WebSocket = require('ws');
const queryString = require('query-string');

let wss;
const connections = {};

const startServer = (options) => {
  wss = new WebSocket.Server(options);
  wss.on('connection', (ws, request) => {
    const clientId = queryString.parseUrl(request.url).query.client;
    if (clientId) connections[clientId] = ws;
  });
};

const send = (clientId, message) => {
  connections[clientId].send(message);
};

module.exports = { startServer, send };
