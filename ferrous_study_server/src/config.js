import dotenv from 'dotenv';

dotenv.config();

console.log("VARIABLE PORT: ", process.env.PORT);
console.log("VARIABLE ORIGIN: ", process.env.ORIGIN);

export const {
  // PROTOCOL = process.env.PROTOCOL || 'http://',
  //  DOMAIN = process.env.DOMAIN || 'localhost:',
  SWAGGER = '/api-docs',
  PORT = process.env.PORT || 3000,
  SECRET_ENCRYOT_KEY = process.env.SALT || 'tcx-crypto',
  ORIGIN = process.env.ORIGIN || ['http://localhost:3001', 'http://localhost:3000'],
  METHODS = process.env.METHODS || ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  SECRET_JWT_KEY = process.env.SECRET_JWT_KEY || "3$t0EsUnC0d1guBonoS3cr3t0_p@r@-t0d0L4@p",
  POSTGRES_VERCEL_URL = process.env.POSTGRES_VERCEL_URL
} = process.env;