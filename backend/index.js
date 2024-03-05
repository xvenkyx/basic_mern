import express from "express";
import cors from 'cors'
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS Policy
//Option-1 Allow all origins with default of CORS
app.use(cors())
//Option-2 Allow custom origins
// app.use(cors({
//   origin: 'http://localhost:5555',
//   methods: ['GET','POST','PUT','DELETE'],
//   allowedHeaders: ['Content-Type']
// }))


app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome!");
});

//Books Router
app.use("/books", booksRoute);

//Database connection
mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`${PORT} is running`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
