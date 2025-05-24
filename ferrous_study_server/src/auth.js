export default async function requireAuth(req, res, next) {
if(req.headers.authorization.split('Bearer ')[1] !== process.env.TOKEN)
  return res.status(403);
  
  next();
}