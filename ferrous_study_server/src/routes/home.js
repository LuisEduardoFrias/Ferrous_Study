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
  const { fileName, content, keywords } = req.body;

  const { userId } = getAuth(req)
  const user = await clerkClient.users.getUser(userId)

  const fullPath = path.join('ferrous_study_web', 'src', 'markdowns', `${fileName}.md`);
  const monthsage = `Creaded a new markdown file, ${fileName}`;

  try {

    const resulCreate = await GithubCore.createFiles([
      { path: fullPath, content, monthsage },
    ]);

    if (resulCreate[0].status === 201) {
      const fullPathClass = path.join('ferrous_study_web', 'src', 'jsons', `class.json`);

      const content = await GithubCore.getFileContent(fullPathClass);
      const class_ = JSON.parse(content);

      class_.push({
        key: class_.length,
        name: fileName,
        addInfo: {
          addData: getData(),
          user: {
            key: userId,
            name: user.fullName
          }
        },
        updateInfo: null,
        keywords: keywords
      })

      const resultUpdate = await updateFile(fullPathClass, JSON.stringify(class_), `add ${fileName} obj to the json of class file`);
      //resultUpdate[0].status === 200
    }

    res.json({ resulCreate });
  } catch (error) {
    console.log("try catch error: ", error)
  }
});

router.put('/', requireAuth(), async (req, res) => {
  const { fileName, content, type } = req.body;
  const monthsage = `Uodate the ${fileName} file.`;

  let fullPath = '';

  if (type === 'markdown')
    fullPath = path.join('ferrous_study_web', 'src', 'markdowns', `${fileName}.md`);
  else
    fullPath = path.join('ferrous_study_web', 'src', 'jsons', `${fileName}.json`);

  const resultUpdate = await updateFile(fullPath, typeof content === "string" ? content : JSON.stringify(content, null, 2), monthsage);

  res.json({ resultUpdate });

});

const Home = router;
export default Home;


async function updateFile(fullPath, content, monthsage) {
  try {
    const fileInfo = await GithubCore.getFile(fullPath);

    if (fileInfo.data && 'sha' in fileInfo.data) {
      const resultUpdate = await GithubCore.updateFiles([
        { path: fullPath, content, monthsage, sha: fileInfo.data.sha },
      ]);

      //   console.log('Respuesta de actualización:', resultUpdate);
      //
      return resultUpdate;
    }
  } catch (error) {
    console.log('try catch put error: ', error)
  }
}

function getData() {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Los monthes en JS van de 0 a 11
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}