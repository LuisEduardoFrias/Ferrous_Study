/*
import express from 'express'
import cors from 'cors'
import path from 'path'
import morgan from 'morgan'
import cookieParser from "cookie-parser"
import { clerkMiddleware } from '@clerk/express'

import { PORT } from '../src/config.js'
import configCors from '../src/config_cors.js'
import home from '../src/routes/home.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//----------------------------

const app = express();

//settings
app.disabled("x-powered-by");

//middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev')); // combined

app.use(cors());
app.use(clerkMiddleware())
app.use(express.static(path.join(__dirname, '../dist')));
//app.use(cors(configCors));

//routers
app.use(home);

//
app.listen(PORT, () => {
  console.log(`server on port:${PORT}`);
});

*/
// api/index.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import { clerkMiddleware } from '@clerk/express';
import { fileURLToPath } from 'url';
import home from '../src/routes/home.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.disabled("x-powered-by");
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(clerkMiddleware());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(home);

// Routers
// Importa tus rutas y úsalas aquí (e.g., app.use('/api', yourRoutes);)

// Exporta la aplicación express como el handler
export default async (req, res) => {
  await app(req, res);
};
