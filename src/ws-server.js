const WebSocket = require('ws');
const queryString = require('query-string');

let wss;
const connections = {};

const startServer = (options) => {
  wss = new WebSocket.Server(options);
  console.log('starting ws server', options);
  wss.on('connection', (ws, request) => {
    const clientId = queryString.parseUrl(request.url).query.client;
    if (clientId) {
      console.log('client connected', clientId);
      connections[clientId] = ws;
    }
  });
};

const send = (clientId, message) => {
  if (connections[clientId] && connections[clientId].readyState === WebSocket.OPEN) {
    console.log('sending client', clientId, message);
    connections[clientId].send(message);
  }
};

module.exports = { startServer, send };
