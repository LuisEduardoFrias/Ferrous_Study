import jwt from 'jsonwebtoken';

export function verifyToken(token, callback) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('Error: JWT_SECRET no está definido en las variables de entorno.');
    return callback(new Error('Configuración de JWT_SECRET faltante.'), null);
  }
  jwt.verify(token, secret, callback);
}

export function generateToken(payload) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.TOKEN_EXPIRATION || '1h';

  if (!secret) {
    console.error('Error: JWT_SECRET no está definido en las variables de entorno.');
    throw new Error('Configuración de JWT_SECRET faltante.');
  }

  return jwt.sign(payload, secret, { expiresIn });
}

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado: Token no proporcionado o formato incorrecto.' });
  }

  const clientToken = (authHeader.split(' ')[1]).split(',');
  const apiToken = clientToken[0], userToken = clientToken[1];

  if (process.env.CUSTOM_API_TOKEN && apiToken !== process.env.CUSTOM_API_TOKEN) {
    return res.status(403).json({ message: 'No autorizado: Token inválido.' });
  }

  next();
}

export async function requireApiAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado: Token no proporcionado o formato incorrecto.' });
  }

  const clientToken = (authHeader.split(' ')[1]).split(',');
  const apiToken = clientToken[0], userToken = clientToken[1];

  if (process.env.CUSTOM_API_TOKEN && apiToken !== process.env.CUSTOM_API_TOKEN) {
    return res.status(403).json({ message: 'No autorizado: Token inválido.' });
  }

  verifyToken(userToken, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'No autorizado: Token expirado.' });
      }
      // Si no es el token especial y el JWT es inválido, retorna 403 o 401
      return res.status(403).json({ message: 'No autorizado: Token inválido.' });
    }
    // Si el JWT es válido
    req.user = user; // Adjunta el payload decodificado del JWT al objeto de solicitud
    next(); // Pasa al siguiente middleware/ruta
  });
}
