import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from "cookie-parser"
import { clerkMiddleware } from '@clerk/express'
import { PORT, /*PROTOCOL, DOMAIN, */ } from '../src/config.js'
import configCors from '../src/config_cors.js'
import path from 'path'
import { fileURLToPath } from 'url';
//

import home from '../src/routes/home.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//----------------------------

const app = express();

//settings
//app.set('protocol', PROTOCOL);
//app.set('domain', DOMAIN);
//app.set('port', PORT);
app.disabled("x-powered-by");

//middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev')); // combined

app.use(cors());
app.use(clerkMiddleware())
app.use(express.static(path.join(__dirname, '../../ferrous_study_web/dist')));
//app.use(cors(configCors));

//routers
app.use(home);

//
app.listen(PORT, () => {
  console.log(`server on port:${PORT}`);
});
