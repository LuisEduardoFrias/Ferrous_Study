import app from '../src/index.js';

export default async (req, res) => {
   await app(req, res);
};

/*
app.listen(3000, () => {
   console.log('Servidor escuchando en el puerto 3000');
});
*/