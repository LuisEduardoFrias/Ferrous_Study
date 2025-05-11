const {
  //PROTOCOL: protocol,
  //DOMAIN: domain,
  PORT: port,
  SECRET_ENCRYPT_KEY: secret_encrypt_key,
  ORIGIN: origin_,
  METHODS: methonds,
  SECRET_JWT_KEY: secre_jwt_key,
} = process.env;


//PROTOCOL = protocol || 'http://',
//DOMAIN = domain || 'localhost:',
const PORT = port || 3000;
const SECRET_ENCRYPT_KEY = secret_encrypt_key || 'tcx-crypto';
const ORIGIN = origin_ || ['http://localhost:3001', 'http://localhost:3000'];
const METHODS = methonds || ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'];
const SECRET_JWT_KEY = secre_jwt_key || "3$t0EsUnC0d1guBonoS3cr3t0_p@r@-t0d0L4@p";

export { PORT, SECRET_ENCRYPT_KEY, ORIGIN, METHODS, SECRET_JWT_KEY };