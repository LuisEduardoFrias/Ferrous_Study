import express from 'express';
import path from 'path';
import { GithubCore } from '../helpers/github.js';
import { searchFilter } from '../helpers/search.js';
import { clerkClient, requireAuth, getAuth } from '@clerk/express';

const router = express.Router();

//TODO Hay logicas que no deverian estar en estas rutas.

router.get('/:fileName/:type', async (req, res) => {
  const { fileName, type } = req.params;

  let fullPath = '';

  if (type === 'markdown')
    fullPath = path.join('ferrous_study_web', 'src', 'markdowns', `${fileName}.md`);
  else
    fullPath = path.join('ferrous_study_web', 'src', 'jsons', `${fileName}.json`);

  const content = await GithubCore.getFileContent(fullPath);

  if (content)
    res.status(200).json({ content });
  else
    res.status(500);

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

  if (content)
    res.status(200).json({ content });
  else
    res.status(500);
});

router.post('/', requireAuth(), async (req, res) => {
  const { fileName, content, keywords } = req.body;

  const fullPath = path.join('ferrous_study_web', 'src', 'markdowns', `${fileName}.md`);
  const monthsage = `Creaded a new markdown file, ${fileName}`;

  try {

    const resulCreate = await GithubCore.createFiles([{ path: fullPath, content, monthsage },]);
    let resultUpdate = null;

    if (resulCreate && !(resulCreate[0].status >= 400)) {
      const fullPathClass = path.join('ferrous_study_web', 'src', 'jsons', `class.json`);

      const content = await GithubCore.getFileContent(fullPathClass);
      const class_ = JSON.parse(content);

      const { userId } = getAuth(req);
      const user = await clerkClient.users.getUser(userId);

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
      });

      resultUpdate = await updateFile(fullPathClass, JSON.stringify(class_), `Added the '${fileName} ' object in the class.json file.`);

      if (!resultUpdate) {
        res.status(500)
      }

      if (resultUpdate[0].status >= 400)
        await updateFile(fullPathClass, JSON.stringify(class_), `Added the '${fileName} ' object in the class.json file.`);
    }

    if (content) {
      console.log(`${resulCreate} \n\n  ${resultUpdate}`)
      res.status(200).json({ resulCreate, resultUpdate });
    }
    else
      res.status(500);

  } catch (error) {
    console.log("try catch error: ", error);
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
  let resultUpdateClass = null;

  if (resultUpdate[0].status >= 400) {
    res.status(resultUpdate[0].status);
  }

  if (type === 'markdown') {

    const fullPathClass = path.join('ferrous_study_web', 'src', 'jsons', `class.json`);

    const content = await GithubCore.getFileContent(fullPathClass);

    if (content) {
      const class_ = JSON.parse(content);

      const { userId } = getAuth(req);
      const user = await clerkClient.users.getUser(userId);

      const index = class_.findIndex((obj) => obj.name === fileName);

      if (index > 0) {
        class_[index] = {
          ...class_[index],
          updateInfo: {
            updateData: getData(),
            user: {
              key: userId,
              name: user.fullName
            }
          }
        };
      }

      resultUpdateClass = await updateFile(fullPathClass, JSON.stringify(class_), `Update the '${fileName} ' object in the class.json file.`);

      if (!resultUpdateClass) {
        res.status(500)
      }

      if (resultUpdateClass[0].status >= 400)
        resultUpdateClass = await updateFile(fullPathClass, JSON.stringify(class_), `Update the '${fileName} ' object in the class.json file.`);

    }
  }

  if (content) {
    console.log(`${resultUpdate} \n\n  ${resultUpdateClass}`);
    res.status(200).json({ resultUpdate, resultUpdateClass });

  }
  else
    res.status(500);

});

const Home = router;
export default Home;

async function updateFile(fullPath, content, monthsage) {
  try {
    const fileInfo = await GithubCore.getFile(fullPath);

    if (fileInfo.data || !('sha' in fileInfo.data)) {
      return null;
    }

    const resultUpdate = await GithubCore.updateFiles([
      { path: fullPath, content, monthsage, sha: fileInfo.data.sha },
    ]);

    return resultUpdate;
  } catch (error) {
    console.log('try catch put error: ', error);
    return null;
  }
}

function getData() {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}