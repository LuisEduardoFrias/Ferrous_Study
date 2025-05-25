import express from 'express';
import path from 'path';
import { GithubCore } from '../helpers/github.js';
import { searchFilter } from '../helpers/search.js';
import { requireAuth, requireApiAuth, generateToken, verifyToken } from '../auth.js';
import matter from 'gray-matter';
import jwt from 'jsonwebtoken';

const router = express.Router();

//TODO Hay logicas que no deverian estar en estas rutas.

router.get('/markdowns/:fileName/', requireAuth, async (req, res) => {
  const { fileName, type } = req.params;

  try {

    const fullPath = path.join('ferrous_study_web', 'src', 'markdowns', `${fileName}.md`);

    const result = await GithubCore.getFileContent(fullPath);

    if (result) {

      const { data, content } = matter(result);

      let textByLanguage = [];

      if (data && content) {
        textByLanguage = data?.languages?.map((lang) => {

          const regex = new RegExp(`language&>${lang.value}<&\\n([\\s\\S]*?)\\nlanguage&>${lang.value}<&`, 's');
          const match = content.match(regex);

          const textTranslate = match ? match[1].trim() : null;

          return { language: lang.value, text: textTranslate };
        });
      }

      return res.status(200).json({ content: content ?? result, metadata: data, textByLanguage });
    }

  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ content: null });
  }
});

router.get('/jsons/:fileName/', requireAuth, async (req, res) => {
  const { fileName, type } = req.params;

  try {

    const fullPath = path.join('ferrous_study_web', 'src', 'jsons', `${fileName}.json`);

    const content = await GithubCore.getFileContent(fullPath);

    return res.status(200).json({ content });

  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ content: null });
  }
});

router.get('/:search', requireAuth, async (req, res) => {
  const { search } = req.params;

  let fullPathMenu = path.join('ferrous_study_web', 'src', 'jsons', `menu.json`);
  let fullPathClass = path.join('ferrous_study_web', 'src', 'jsons', `class.json`);

  const [contentMenu, contentClass] = await Promise.all([
    GithubCore.getFileContent(fullPathMenu),
    GithubCore.getFileContent(fullPathClass)
  ]);

  const content = searchFilter(search, contentMenu, contentClass);

  if (content)
    return res.status(200).json({ content });
  else
    return res.status(500).json({ content: null });
});

router.post('/login', requireAuth, async (req, res) => {
  const { username, password } = req.body;

  const envUsername = process.env.USERNAME;
  const envPassword = process.env.PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!envUsername || !envPassword || !jwtSecret) {
    console.error('Variables de entorno de autenticación no configuradas correctamente.');
    return res.status(500).json({ message: 'Error de configuración del servidor.' });
  }

  if (username === envUsername && password === envPassword) {
    const userPayload = {
      username: username,
      role: 'admin',
    };

    try {
      const token = generateToken(userPayload);

      return res.status(200).json({
        message: 'Inicio de sesión exitoso',
        user: {
          username: username,
          token: token,
        },
      });
    } catch (error) {
      console.error('Error al generar el token:', error);
      return res.status(500).json({ message: 'Error interno del servidor al generar el token.' });
    }
  } else {
    return res.status(401).json({ message: 'Credenciales inválidas.' });
  }
});

router.post('/', requireApiAuth, async (req, res) => {
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

      const userId = "hnrt7hehi84rbopte23g8bdt7kn"

      class_.push({
        key: class_.length,
        name: fileName,
        addInfo: {
          addData: getData(),
          user: {
            key: userId,
            name: "LuisEduardo"
          }
        },
        updateInfo: null,
        keywords: keywords
      });

      resultUpdate = await updateFile(fullPathClass, JSON.stringify(class_), `Added the '${fileName} ' object in the class.json file.`);

      //  console.log(`vslidsndo reouesta con error:  \n\n  ${resultUpdate}`)

      if (!resultUpdate) {
        return res.status(500).json({ content: null });
      }

      if (resultUpdate[0].status >= 400) {
        await updateFile(fullPathClass, JSON.stringify(class_), `Added the '${fileName} ' object in the class.json file.`);
      }
    }

    if (content) {
      //  console.log(`${resulCreate} \n\n  ${resultUpdate}`);
      return res.status(200).json({ resulCreate, resultUpdate });
    } else {
      return res.status(500).json({ content: null });
    }
  } catch (error) {
    console.log("try catch error: ", error);
    return res.status(500).json({ content: null });
  }
});


router.put('/', requireApiAuth, async (req, res) => {
  const { fileName, content, type } = req.body;
  const monthsage = `Uodate the ${fileName} file.`;

  try {


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

        const userId = "hnrt7hehi84rbopte23g8bdt7kn"

        const index = class_.findIndex((obj) => obj.name === fileName);

        if (index > 0) {
          class_[index] = {
            ...class_[index],
            updateInfo: {
              updateData: getData(),
              user: {
                key: userId,
                name: "LuisEduardo"
              }
            }
          };
        }

        resultUpdateClass = await updateFile(fullPathClass, JSON.stringify(class_), `Update the '${fileName} ' object in the class.json file.`);

        if (!resultUpdateClass) {
          return res.status(500).json({ content: null });
        }

        if (resultUpdateClass[0].status >= 400) {
          resultUpdateClass = await updateFile(fullPathClass, JSON.stringify(class_), `Update the '${fileName} ' object in the class.json file.`);
        }
      }
    }

    if (content) {
      // console.log(`${resultUpdate} \n\n  ${resultUpdateClass}`);
      return res.status(200).json({ resultUpdate, resultUpdateClass });
    }
    else {
      return res.status(500).json({ content: null });
    }
  } catch (error) {
    console.log("try catch error: ", error);
    return res.status(500).json({ content: null });
  }
});

const Home = router;
export default Home;

async function updateFile(fullPath, content, monthsage) {
  try {
    const fileInfo = await GithubCore.getFile(fullPath);

    if (!fileInfo.data || !('sha' in fileInfo.data)) {
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