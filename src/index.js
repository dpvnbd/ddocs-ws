require('dotenv').config();

const redis = require('redis');
const { startServer, send } = require('./ws-server');
const { subscribe } = require('./pub-sub');

const redisClient = redis.createClient(process.env.REDIS_URL);
startServer({ port: process.env.PORT || 8080 });
subscribe(redisClient, send);
