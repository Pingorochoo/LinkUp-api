import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { join, dirname } from "path";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";
import dbConnect from "./config/db_connect.js";
import router from "./routes/index.js";

dbConnect();
dotenv.config();

// initializations
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// settings
app.set("port", process.env.PORT || 6001);
app.set("assets", join(__dirname, "public/assets"));

// globals
app.locals.assets = app.get("assets");

//premiddlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// routes
app.use("/api", router);
app.use("/", router);

// postmiddlewares
//---


// public
app.use("/assets", express.static(app.get("assets")));

export default app;
