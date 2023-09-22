// Import required modules
import express from 'express';
import ejs from 'ejs';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import connectToDB from './server/database/connection.js';

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Declare middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

// Set EJS as the view engine and specify the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'client', 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'client', 'public')));

// Import and use routes (from the 'routes' folder)
import appRoutes from './server/routes/appRouter.js';
import authRoutes from './server/routes/authRouter.js';
app.use('/', appRoutes);
app.use('/', authRoutes);

// Start the server
connectToDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
})