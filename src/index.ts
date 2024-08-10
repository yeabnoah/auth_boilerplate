import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import http from "http";
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/typescriptWithExpress");

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

const hello = " user name is used already";

app.get("/", (req, res) => {
  res.json("welcome to the best api Guide");
});

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("Connected to database");

  server.listen(3000, () => {
    console.log("API is working at http://localhost:3000/");
  });
});
