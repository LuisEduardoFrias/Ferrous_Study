import type { TMenu } from '../types/menu';

async function auth() {
  const clerk = (window as any).clerk;
  return { token: await clerk?.session?.getToken({ template: 'Plantilla1' }) };
}

const API_BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_FULL_API_BASE_URL : '';
const FULL_API_BASE_URL = `${API_BASE_URL}api/`;
//const FULL_API_BASE_URL = import.meta.env.BASE_URL;

export type FileContentResponse = {
  content?: string | null;
}

export type FileOperationResponse = {
  resulCreate?: any; // Ajusta el tipo según la respuesta real de tu API
  resultUpdate?: any; // Ajusta el tipo según la respuesta real de tu API
}

export const githubService = {
  /**
   * Obtiene el contenido de un archivo (Markdown o JSON) desde el servidor usando Fetch.
   * @param fileName El nombre del archivo (sin extensión).
   * @param type El tipo de archivo ('markdown' o 'json').
   * @returns Una promesa que resuelve al contenido del archivo o null si hay un error.
   */
  async getFileContent(fileName: string, type: 'markdown' | 'json'): Promise<string | null> {
    const { token } = await auth();

    try {
      const response = await fetch(`${FULL_API_BASE_URL}${fileName}/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`Error al obtener el contenido de ${fileName}.${type}:`, response.status);
        return null;
      }
      const data: FileContentResponse = await response.json();
      return data.content || null;
    } catch (error) {
      console.error(`Error de red al obtener el contenido de ${fileName}.${type}:`, error);
      return null;
    }
  },

  /**
   * B7sca un pskabra clave en asociada a los markdiens desde el servidor usando Fetch.
   * @param search Palabra clave a buscar.
   * @returns Una promesa que resuelve a un arreglo de informacion o o null si hay un error.
   */
  async searchContent(search: string): Promise<TMenu[] | null> {
    // const { token } = await auth();

    try {
      const response = await fetch(`${FULL_API_BASE_URL}${search}`)/*, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
*/
      if (!response.ok) {
        console.error(`Error al buscar '${search}':`, response.status);
        return null;
      }
      const data = await response.json();
      return data.content || null;
    } catch (error) {
      console.error(`Error de red al buscae '${search}':`, error);
      return null;
    }
  },

  /**
   * Crea un nuevo archivo Markdown en el servidor usando Fetch.
   * @param fileName El nombre del archivo (sin extensión).
   * @param content El contenido del archivo.
   * @returns Una promesa que resuelve a la respuesta de la creación del archivo.
   */
  async createMarkdownFile(fileName: string, content: string, keywords: string[]): Promise<{ message: string, data?: any }> {
    const { token } = await auth();

    try {
      const response = await fetch(FULL_API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fileName, content, keywords }),
      });

      if (!response.ok) {
        console.error(`Error al crear el archivo ${fileName}.md:`, response.status);
        return { message: 'Error al crear la nueva clase' };
        // throw new Error(`Error al crear el archivo: ${response.status}`);
      }

      const data: FileOperationResponse = await response.json();
      return { message: 'Clase creada con éxito.', data };
    } catch (error) {
      console.error(`Error al crear el archivo ${fileName}.md:`, error);
      throw error;
    }
  },

  /**
   * Actualiza el contenido de un archivo (Markdown o JSON) existente en el servidor usando Fetch.
   * @param fileName El nombre del archivo (sin extensión).
   * @param content El nuevo contenido del archivo.
   * @param type El tipo de archivo ('markdown' o 'json').
   * @returns Una promesa que resuelve a la respuesta de la actualización del archivo.
   */
  async updateFileContent(fileName: string, content: string | TMenu[], type: 'markdown' | 'json'): Promise<{ message: string, data?: any }> {
    const { token } = await auth();

    try {
      const response = await fetch(FULL_API_BASE_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fileName, content, type }),
      });
      if (!response.ok) {
        console.error(`Error al actualizar el archivo ${fileName}.${type}:`, response.status);
        return { message: 'Error al guardas los datos.' };
        // throw new Error(`Error al actualizar el archivo: ${response.status}`);
      }
      const data: FileOperationResponse = await response.json();
      return { message: 'Datos guardados con éxito.', data };

    } catch (error) {
      console.error(`Error al actualizar el archivo ${fileName}.${type}:`, error);
      throw error;
    }
  },
};
