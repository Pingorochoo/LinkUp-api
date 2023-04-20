import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import helmet from 'helmet';
import morgan from "morgan";
import { fileURLToPath } from "url";
import dbConnect from './config/db_connect.js'
import router from "./routes/index.js";

dbConnect()
dotenv.config();

// initializations
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// settings
app.set('port', process.env.PORT);
app.set('assets', join(__dirname, 'public/assets'));

// globals
app.locals.assets = app.get('assets')

//premiddlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(bodyParser.json({ limit: "30mb", extender: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extender: true }));

// routes
app.use('/api',router)
// postmiddlewares

// public
app.use('/assets', express.static(join(__dirname, 'public/assets')));


export default app



