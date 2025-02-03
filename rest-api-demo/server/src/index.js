import express from 'express';
import routes from './routes.js';
import cors from 'cors';
import mongoose from 'mongoose';
import { authMiddlewear } from './middlewares/authMiddleware.js';

try {
    await mongoose.connect('mongodb://localhost:27017', {dbName: 'furniture'});
    console.log('Connected to DB');
} catch (error) {
    console.log('Cannot connect to DB');
}

const app = express();

app.use(express.json());
app.use(cors());
app.use(authMiddlewear);
app.use(routes);

app.listen(3030, () => console.log('Server on http://localhost:3030'));