import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();
// URL koneksi Redis Cloud
let redisClient;

(async () => {
  redisClient = createClient({
    password: process.env.PW_REDIS,
    socket: {
        host: process.env.HOST_REDIS,
        port: process.env.PORT_REDIS
    }
});

    redisClient.on('error', (err) => {
      console.error('Error connecting to Redis:', err);
    });
    
    redisClient.on('connect', () => {
      console.log('Connected to Redis');
    });

    await redisClient.connect();
})();

export default redisClient;
