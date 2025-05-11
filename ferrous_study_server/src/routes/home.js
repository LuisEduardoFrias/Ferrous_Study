import express from 'express';
import path from 'path';
import { GithubCore } from '../helpers/github.js';

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

router.post('/', async (req, res) => {
  const { fileName, content } = req.body;

  const fullPath = path.join('ferrous_study_web', 'src', 'markdowns', `${fileName}.md`);
  const message = "new file markdown";

  const resulCreate = await GithubCore.createFiles([
    { path: fullPath, content, message },
  ]);

  console.log('Respuesta de creación:', resulCreate);

  res.json({ resulCreate });
});

router.put('/', async (req, res) => {
  const { fileName, content, type } = req.body;
  const message = "update file markdown";

  let fullPath = '';

  if (type === 'markdown')
    fullPath = path.join('ferrous_study_web', 'src', 'markdowns', `${fileName}.md`);
  else
    fullPath = path.join('ferrous_study_web', 'src', 'jsons', `${fileName}.json`);

  const fileInfo = await octokit.rest.repos.getContent({ owner: 'LuisEduardoFrias', repo: 'Ferrous_Study', path: fullPath });

  if (fileInfo.data && 'sha' in fileInfo.data) {

    const resultUpdate = await GithubCore.updateFiles([
      { path: fullPath, content, message, sha: fileInfo.data.sha },
    ]);

    console.log('Respuesta de actualización:', resultUpdate);

    res.json({ resultUpdate });
  }
});


const Home = router;
export default Home;