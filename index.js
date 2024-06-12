import express from "express"
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import userRoutes from './router.js';
import redisClient from './redisConfig.js';
dotenv.config();
const app = express();

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors({
	origin: ["http://localhost:5000",  process.env.CLIENT_URL], // diganti ip api gateway
	methods: "GET,POST,PUT,DELETE",
	credentials: true,
	allowedHeaders: ['Content-Type']
	// allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/user', userRoutes);
app.use((req, res, next) => {
	const error = new Error("Not found!");
	error.status = 404;
	next(error);
});
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: true,
		message: error.message
	});
});
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
	console.log('SIGINT signal received: closing Redis client');
	redisClient.quit();
	process.exit(0);
  })