import express from 'express';
import cors from 'cors';
import {join,dirname} from 'path';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import home from '../src/routes/home.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.disabled("x-powered-by");
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
// Routers

app.use(express.static(join(__dirname, '../dist')));

app.use('/api', home);

app.use('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

/*
export default async (req, res) => {
  await app(req, res);
};
*/

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});