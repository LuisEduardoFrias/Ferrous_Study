import type { TMenu } from '../types/menu';
import type { TServiceResult } from '../types/service_result';

const API_BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_API_BASE_URL : '';
const FULL_API_BASE_URL = `${API_BASE_URL}/api`;
const TOKEN = import.meta.env.VITE_TOKEN

export type FileContentResponse = {
  content?: string | null;
}

export type FileOperationResponse = {
  resulCreate?: any;
  resultUpdate?: any;
}

type typeFile = 'markdown' | 'json';

export const githubServiceApi = {

  async getFileContentByMarkdown(fileName: string): Promise<object | null> {
    try {
      const response = await fetch(`${FULL_API_BASE_URL}/markdowns/${fileName}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (!response.ok) {
        console.error(`Error al obtener el contenido de ${fileName}.${type}:`, response.status);
        return null;
      }

      const data = await response.json();
      return data || null;

    } catch (error) {
      console.error(`Error de red al obtener el contenido de ${fileName}.${type}:`, error);
      return null;
    }
  },

  async getFileContentByJson(fileName: string): Promise<string | null> {
    try {
      const response = await fetch(`${FULL_API_BASE_URL}/jsons/${fileName}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (!response.ok) {
        console.error(`Error al obtener el contenido de ${fileName}.${type}:`, response.status);
        return null;
      }

      const data: FileContentResponse = await response.json();
      return data?.content || null;

    } catch (error) {
      console.error(`Error de red al obtener el contenido de ${fileName}.${type}:`, error);
      return null;
    }
  },

  async searchContent(search: string): Promise<TMenu[] | null> {
    try {
      const response = await fetch(`${FULL_API_BASE_URL}/${search}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (!response.ok) {
        console.error(`Error al buscar '${search}':`, response.status);
        return null;
      }

      const data = await response.json();
      return data?.content || null;
    } catch (error) {
      console.error(`Error de red al buscae '${search}':`, error);
      return null;
    }
  },

  async createMarkdownFile(fileName: string, content: string, keywords: string[]): Promise<TServiceResult> {
    try {
      const response = await fetch(FULL_API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ fileName, content, keywords }),
      });

      if (!response.ok) {
        console.error(`Error al crear el archivo ${fileName}.md:`, response.status);
        return { message: 'Error al crear la nueva clase' };
      }

      const data: FileOperationResponse = await response.json();
      return { message: 'Clase creada con éxito.', data };
    } catch (error) {
      console.error(`Error web al crear el archivo ${fileName}.md:`, error);
      return { message: 'Error al crear la nueva clase' };
    }
  },

  async updateFileContent(fileName: string, content: string | TMenu[], type: typeFile): Promise<TServiceResult> {
    try {
      const response = await fetch(FULL_API_BASE_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
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
      console.error(`Error web al actualizar el archivo ${fileName}.${type}:`, error);
      return { message: 'Error al guardas los datos.' };
    }
  },
};

/*
export const githubService = {

  async getFileContent(fileName: string, type: 'markdown' | 'json'): Promise<string | null> {
    return await FileService.getFileContent(fileName, type);
  },

  async searchContent(search: string): Promise<TMenu[] | null> {
    return await FileService.searchContent(search);
  },

  async createMarkdownFile(fileName: string, content: string, keywords: string[]): Promise<TServiceResult> {
    return await FileService.createMarkdownFile(fileName, content, keywords);
  },

  async updateFileContent(fileName: string, content: string | TMenu[], type: 'markdown' | 'json'): Promise<TServiceResult> {
    return await FileService.updateFileContent(fileName, content, type);
  },
};
*/