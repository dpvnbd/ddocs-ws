// const { expect } = require('chai');
// const sinon = require('sinon');
// const WebSocket = require('ws');
// const { startServer, send } = require('../src/ws-server');

// describe('websocket client', () => {
//   let client1;
//   let client2;
//   const client1Id = 'secretClientChannelId';

//   before(() => {
//     startServer({ port: 8080 });
//   });
//   beforeEach((done) => {
//     client1 = new WebSocket(`ws://localhost:8080?client=${client1Id}`);
//     client2 = new WebSocket('ws://localhost:8080?client=otherClient');
//     client1.on('open', () => done());
//   });

//   it('sends message to client', (done) => {
//     const sentData = 'secretData';
//     const spy = sinon.spy();

//     client1.on('message', (message) => {
//       spy(message);
//     });
//     send(client1Id, sentData);
//     setTimeout(() => {
//       sinon.assert.calledWith(spy, sentData);
//       done();
//     }, 1000);
//   });

//   it("doesn't send data to other clients", (done) => {
//     const sentData = 'secretData';
//     const spy = sinon.spy();
//     client2.on('message', spy);
//     send(client1Id, sentData);
//     setTimeout(() => {
//       sinon.assert.calledOnce(spy);
//       done();
//     }, 1000);
//   });
// });
