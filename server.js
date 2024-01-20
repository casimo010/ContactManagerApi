import express from 'express';
import { connectDB } from "./config/dbConnection.js";
import dotenv from "dotenv";
import { router as contactsRouter } from './routes/ContactsRoutes.js';
import { router as usersRouter } from './routes/userRoutes.js';  // Assuming you have a 'router' export in userRoutes.js
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

connectDB();

dotenv.config();

const port = process.env.PORT || 5001;

// parse json middleware
app.use(express.json());

// errorHandler middleware
app.use(errorHandler);

// port
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

// Use routes
app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);


