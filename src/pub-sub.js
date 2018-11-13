const { promisify } = require('util');

const subscribe = async (redisClient, channel, onMessageCallback) => {
  redisClient.on('message', onMessageCallback);
  const psubscribeAsync = promisify(redisClient.psubscribe).bind(redisClient);
  await psubscribeAsync('*', onMessageCallback);
};

module.exports = { subscribe };
