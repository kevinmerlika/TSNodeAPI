import express, { Application } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import mainRoutes from './routes/mainRoutes';
import navbarRoutes from './routes/navbarRoutes';

dotenv.config();

const app: Application = express();



const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


// Use the express-ip middleware
app.use((req: Request, res: Response, next) => {
    const clientIP = req.ip; // Get the client's IP address from the request object
    console.log('Client IP:', clientIP);
    next();
});
app.use('/', mainRoutes)
app.use('/nav', navbarRoutes);
app.use('/users', userRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});