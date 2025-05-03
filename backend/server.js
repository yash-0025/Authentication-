import express from "express";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import router from './routes/userRoutes.js';
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

const port = process.env.PORT || 5001;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser);


app.use('/api/users', router);




app.use(notFound);
app.use(errorHandler);



app.listen(port, () => console.log(`Server is up and running on PORT :: ${port}`));
