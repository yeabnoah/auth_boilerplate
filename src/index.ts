import express, { Request, Response } from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import http from "http";
import mongoose from "mongoose";
import userRoute from "./user/routes/userRoute";
import { config } from "dotenv";

// Load environment variables
config();

const mongoUri = process.env.MONGODB_URI!;
const port = process.env.PORT!;

mongoose.connect(mongoUri).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
  process.exit(1);
});

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

app.get("/", (req: Request, res: Response) => {
  res.json("Welcome to the best API guide");
});

app.use("/user", userRoute);

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("Connected to database");

  server.listen(port, () => {
    console.log(`API is working at http://localhost:${port}/`);
  });
});
