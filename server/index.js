import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { connectMongoose } from './database/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app = express();

const PORT = process.env.PORT || 5000;

connectMongoose();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.listen(PORT, () => {
   console.log(`the server is listening in port ${PORT} `);
})