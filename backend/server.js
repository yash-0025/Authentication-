import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

const port = process.env.PORT || 5001;

connectDB();

const app = express();
app.use(express.json());



app.listen(port, () => console.log(`Server is up and running on PORT :: ${port}`));
