const { expect } = require('chai');
const sinon = require('sinon');
const redis = require('redis-mock');
const { subscribe } = require('../src/pub-sub');

describe('pub-sub client', () => {
  let redisClient;

  before(async () => {
    redisClient = redis.createClient();
  });

  it('executes callback on message', (done) => {
    const spy = sinon.spy();
    subscribe(redisClient, 'notes', spy, {});
    redisClient.publish('notes', 'test note', () => {
      sinon.assert.calledOnce(spy);
      done();
    });
  });

  it('passes channel name and note content to the callback', (done) => {
    const spy = sinon.spy();
    const channel = 'test channel';
    const note = 'test note';
    subscribe(redisClient, channel, spy, {});
    redisClient.publish(channel, note, () => {
      sinon.assert.calledWith(spy, channel, note);
      done();
    });
  });
});
