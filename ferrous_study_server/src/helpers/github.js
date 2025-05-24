import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const OWNER = process.env.GITHUB_USER_NAME;
const REPO = process.env.GITHUB_PROJECT;

export const GithubCore = {

  async getFileContent(filePath) {
    try {
      const response = await octokit.rest.repos.getContent({
        owner: OWNER,
        repo: REPO,
        path: filePath,
      });

      if (response.data && 'content' in response.data && response.data.encoding === 'base64') {
        return Buffer.from(response.data.content, 'base64').toString('utf-8');
      }

      console.error(`Error al obtener el contenido de ${filePath} en ${OWNER}/${REPO}:`,
        `optencion de datos incompatible con los requerido, requerimiento:
        response.data: ${response.data},
        content in response.data: ${'content' in response.data},
        response.data.encoding === 'base64: ${response.data.encoding === 'base64'}`);

      return null;
    } catch (error) {
      console.error(`Error al obtener el contenido de "${filePath}" en "${OWNER}/${REPO}":`);
      return null;
    }
  },

  async getFile(filePath) {
    try {
      const response = await octokit.rest.repos.getContent({
        owner: OWNER,
        repo: REPO,
        path: filePath,
      });

      return response;
    } catch (error) {
      console.error(`Error al obtener el contenido de ${filePath} en ${OWNER}/${REPO}:`, error);
      return null;
    }
  },

  async updateFiles(filesToUpdate) {
    try {
      const responses = await Promise.all(
        filesToUpdate.map(async (file) => {
          return octokit.rest.repos.createOrUpdateFileContents({
            owner: OWNER,
            repo: REPO,
            path: file.path,
            message: file.message || `Actualización de ${file.path}`,
            content: Buffer.from(file.content).toString('base64'),
            sha: file.sha, // Necesario para actualizar archivos existentes
          });
        })
      );
      return responses;
    } catch (error) {
      console.error(`Error al actualizar archivos en ${OWNER}/${REPO}:`, error);
      return null;
    }
  },

  async createFiles(filesToCreate) {
    try {
      const responses = await Promise.all(
        filesToCreate.map(async (file) => {
          return octokit.rest.repos.createOrUpdateFileContents({
            owner: OWNER,
            repo: REPO,
            path: file.path,
            message: file.message || `Creación de ${file.path}`,
            content: Buffer.from(file.content).toString('base64'),
          });
        })
      );
      return responses;
    } catch (error) {
      console.error(`Error al crear archivos en ${OWNER}/${REPO}:`, error);
      return null;
    }
  },
};