const { expect } = require('chai');
const sinon = require('sinon');
const redis = require('redis-mock');
const { subscribe } = require('../src/pub-sub');

describe('pub-sub client', () => {
  let redisClient;
  let redisClient2;

  before(() => {
    redisClient = redis.createClient();
    redisClient2 = redis.createClient();
  });

  it('executes callback on message', (done) => {
    const channel = 'oobjecdj';
    const message = 'fkldkad';

    subscribe(redisClient2, (ch, msg) => {
      expect(ch).to.be.equal(channel);
      expect(msg).to.be.equal(message);
      done();
    });
    redisClient.publish(channel, message);
  });
});
