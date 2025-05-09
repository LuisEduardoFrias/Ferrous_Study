import { ORIGIN, METHODS } from './config.js';

const configCors = {
  origin: ORIGIN,
  accept: 'application/json',
  methods: METHODS,
  credentials: true,
  //allowedHeaders: 'Content-Type,Authorization',
};

export default configCors;