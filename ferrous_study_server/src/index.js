import express from 'express';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import home from './routes/home.js';
import cors from 'cors';

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
   res.sendFile(join(__dirname, "../dist", "index.html"));
});

export default app;