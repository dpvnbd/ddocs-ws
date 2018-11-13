const { expect } = require('chai');
const WebSocket = require('ws');
const { startServer, send } = require('../src/ws-server');

describe('websocket client', () => {
  let client1;
  const client1Id = 'secretClientChannelId';

  before(() => {
    startServer({ port: 8080 });
  });
  beforeEach((done) => {
    client1 = new WebSocket(`ws://localhost:8080?client=${client1Id}`);
    client1.on('open', () => done());
  });

  it('sends message to client', (done) => {
    const sentData = 'secretData';

    client1.on('message', (message) => {
      expect(message).to.be.equal(sentData);
      done();
    });
    send(client1Id, sentData);
  });

  it('doesn\'t crash sending message to non-existent client', (done) => {
    const sentData = 'secretData';
    send('llolll', sentData);
    setTimeout(() => done(), 100);
  }).timeout(1000);


  it('doesn\'t send message to closed client', (done) => {
    const sentData = 'secretData';
    client1.on('message', () => {
      expect.fail();
    });
    client1.terminate();
    send(client1Id, sentData);
    setTimeout(() => done(), 100);
  }).timeout(1000);
});
