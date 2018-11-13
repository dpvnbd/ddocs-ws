const subscribe = (redisClient, onMessageCallback) => {
  redisClient.on('pmessage', (pattern, channel, message) => onMessageCallback(channel, message));
  redisClient.psubscribe('*');
};

module.exports = { subscribe };
