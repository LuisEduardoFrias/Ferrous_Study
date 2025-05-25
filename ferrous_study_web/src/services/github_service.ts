import User from '../assets/svgs/user';
import type { TMenu } from '../types/menu';
import type { TUser } from '../types/user';
import type { TServiceResult } from '../types/service_result';
import { TSuggestion } from '../types/suggestion'
import { setUser } from '../components/auth'
import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_API_BASE_URL : '';
const FULL_API_BASE_URL = `${API_BASE_URL}/api`;
const TOKEN = import.meta.env.VITE_TOKEN
const TOKEN_COOKIE_NAME = 'authToken';

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
      return data;

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

  async login(username: string, password: string): Promise<TUser> {
    try {
      const response = await fetch(`${FULL_API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        console.error(`Error al inisial sección`, response.status);
        return { error: 'Error al inicial sección' };
      }

      const { user }: { user: TUser } = await response.json();

      if (user && user.token) {
        saveTokenToCookie(user.token);
        setUser(user)
        return { user };
      }

      return { error: 'Error al inicial sección' };
    } catch (error) {
      console.error(`Error al inisial sección`, error);
      return { error: 'Error al inisial sección' };
    }
  },

  async sendEmail(suggestion: TSuggestion): Promise<TServiceResult> {
    try {
      const response = await fetch(`${FULL_API_BASE_URL}/suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(suggestion),
      });

      if (!response.ok) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  },

  async createMarkdownFile(fileName: string, content: string, keywords: string[]): Promise<TServiceResult> {
    const token = getTokenFromCookie();

    if (!token) {
      console.error('No hay token de autenticación disponible.');
      return null;
    }

    try {
      const response = await fetch(FULL_API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN},${token}`,
        },
        body: JSON.stringify({ fileName, content, keywords }),
      });

      if (!response.ok) {
        console.error(`Error al crear el archivo ${fileName}.md:`, response.status);
        if (response.status === 401 || response.status === 403) {
          removeTokenFromCookie();
        }
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
    const token = getTokenFromCookie();

    if (!token) {
      console.error('No hay token de autenticación disponible.');
      return null;
    }

    try {
      const response = await fetch(FULL_API_BASE_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN},${token}`,
        },
        body: JSON.stringify({ fileName, content, type }),
      });

      if (!response.ok) {
        console.error(`Error al actualizar el archivo ${fileName}.${type}:`, response.status);
        if (response.status === 401 || response.status === 403) {
          removeTokenFromCookie();
        }
        return { message: 'Error al guardas los datos.' };
      }

      const data: FileOperationResponse = await response.json();
      return { message: 'Datos guardados con éxito.', data };

    } catch (error) {
      console.error(`Error web al actualizar el archivo ${fileName}.${type}:`, error);
      return { message: 'Error al guardas los datos.' };
    }
  },
};

function saveTokenToCookie(token: string) {
  Cookies.set(TOKEN_COOKIE_NAME, token, { expires: 1, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' });
}

function getTokenFromCookie(): string | undefined {
  return Cookies.get(TOKEN_COOKIE_NAME);
}

function removeTokenFromCookie() {
  Cookies.remove(TOKEN_COOKIE_NAME);
}
