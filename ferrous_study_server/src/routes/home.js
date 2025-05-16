import express from 'express';
import path from 'path';
import { GithubCore } from '../helpers/github.js';
import { searchFilter } from '../helpers/search.js';
import { clerkClient, requireAuth, getAuth } from '@clerk/express'

const router = express.Router();


router.get('/:fileName/:type', async (req, res) => {
  const { fileName, type } = req.params;

  let fullPath = '';

  if (type === 'markdown')
    fullPath = path.join('ferrous_study_web', 'src', 'markdowns', `${fileName}.md`);
  else
    fullPath = path.join('ferrous_study_web', 'src', 'jsons', `${fileName}.json`);

  const content = await GithubCore.getFileContent(fullPath);

  res.json({ content });
});

router.get('/:search', async (req, res) => {
  const { search } = req.params;

  let fullPathMenu = path.join('ferrous_study_web', 'src', 'jsons', `menu.json`);
  let fullPathClass = path.join('ferrous_study_web', 'src', 'jsons', `class.json`);

  const [contentMenu, contentClass] = await Promise.all([
    GithubCore.getFileContent(fullPathMenu),
    GithubCore.getFileContent(fullPathClass)
  ]);

  const content = searchFilter(search, contentMenu, contentClass);

  res.json({ content });
});

router.post('/', requireAuth(), async (req, res) => {
  const { fileName, content } = req.body;

  // const { userId } = getAuth(req)
  //   const user = await clerkClient.users.getUser(userId)

  const fullPath = path.join('ferrous_study_web', 'src', 'markdowns', `${fileName}.md`);
  const message = "new file markdown";

  try {

    const resulCreate = await GithubCore.createFiles([
      { path: fullPath, content, message },
    ]);

    console.log('Respuesta de creación:', resulCreate);

    res.json({ resulCreate });
  } catch (error) {
    console.log("try catch error: ", error)
  }
});

router.put('/', requireAuth(), async (req, res) => {
  console.log('probando');

  const { fileName, content, type } = req.body;
  const message = "update file markdown";

  let fullPath = '';

  if (type === 'markdown')
    fullPath = path.join('ferrous_study_web', 'src', 'markdowns', `${fileName}.md`);
  else
    fullPath = path.join('ferrous_study_web', 'src', 'jsons', `${fileName}.json`);

  try {

    const fileInfo = await GithubCore.getFile(fullPath);
    console.log("verificando sha: ", fileInfo);

    if (fileInfo.data && 'sha' in fileInfo.data) {
      console.log("updating: content ", content);
      const resultUpdate = await GithubCore.updateFiles([
        { path: fullPath, content, message, sha: fileInfo.data.sha },
      ]);

      console.log('Respuesta de actualización:', resultUpdate);

      res.json({ resultUpdate });
    }
  } catch (error) {
    console.log('try catch put error: ', error)
  }
});

const Home = router;
export default Home;
