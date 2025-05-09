import express from 'express';
import path from 'path';
const { pathname: root } = new URL('../../', import.meta.url)

//----------------------------
const router = express.Router();

router.get('/', async (req, res) => {
  //res.sendFile(path.join(root, '/home.html'));
  res.sendFile(path.join(root, 'public/home.html'));
  //res.send(root)
});

const Home = router;
export default Home;