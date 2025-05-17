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
// Routers

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/', home);

app.use('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});


export default async (req, res) => {
  await app(req, res);
};

// app.listen(3000, () => {
//   console.log('Servidor escuchando en el puerto 3000');
// });
// 