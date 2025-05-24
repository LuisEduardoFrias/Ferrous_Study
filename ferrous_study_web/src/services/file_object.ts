
import type { TMenu } from '../types/menu';
import type { TServiceResult } from '../types/service_result';


export type FileContentResponse = {
  content?: string | null;
}

export type FileOperationResponse = {
  resulCreate?: any; // Ajusta el tipo según la respuesta real de tu API
  resultUpdate?: any; // Ajusta el tipo según la respuesta real de tu API
}

async function getDataFile(fileName: string, type: 'markdown' | 'json') {
  try {
    let DynamicComponent = null;

    if (type === "markdown") {
      const modules = import.meta.glob('../markdowns/*.md', { eager: true, as: 'raw' });

      const filePath = `../markdowns/${fileName}.md`;
      if (modules[filePath]) {
        DynamicComponent = modules[filePath];
      } else {
        throw new Error(`Markdown file not found: ${filePath}`);
      }
    } else {
      DynamicComponent = await import(`../jsons/${fileName}.json`);
    }

    const data = typeof DynamicComponent === "string" ? DynamicComponent : JSON.stringify(DynamicComponent.default);
    return { data, error: null };
  } catch (error) {
    console.error('---', error);
    return { data: "", error: (error as Error).message || "An unknown error occurred" };
  }
}


// async function getDataFile(fileName: string, type: 'markdown' | 'json') {
//   try {
// 
//     let DynamicComponent = null;
//     if (type === "markdown")
//       DynamicComponent = await import(`@/${fileName}.md}`);
//     else
//       DynamicComponent = await import(`@/../jsons/${fileName}.json`);
// 
//     const data = typeof DynamicComponent === "string" ? DynamicComponent : JSON.stringify(DynamicComponent.default);
//     return { data, error: null };
//   } catch (error) {
//     console.log('---', error)
//     return { data: "", error: null };
//   }
// }

export const FileService = {

  async getFileContent(fileName: string, type: 'markdown' | 'json'): Promise<string | null> {
    try {
      const response = await getDataFile(fileName, type);

      if (response.error) {
        console.error(`Error al obtener el contenido de ${fileName}.${type}:`, response.error);
        return null;
      }

      return response.data;

    } catch (error) {
      console.error(`Error de red al obtener el contenido de ${fileName}.${type}:`, error);
      return null;
    }
  },

  async searchContent(search: string): Promise<TMenu[] | null> {
    try {
      const response = await getDataFile('class', 'json');

      if (response.error) {
        console.error(`Error al buscar '${search}':`, response.error);
        return null;
      }

      return JSON.parse(response.data);
    } catch (error) {
      console.error(`Error de red al buscae '${search}':`, error);
      return null;
    }
  },

  async createMarkdownFile(fileName: string, content: string, keywords: string[]): Promise<TServiceResult> {
    try {
      const response = await getDataFile(fileName, type);
      //body: JSON.stringify({ fileName, content, keywords }),

      if (response.error) {
        console.error(`Error al crear el archivo ${fileName}.md:`, response.error);
        return { message: 'Error al crear la nueva clase' };
      }

      const data: FileOperationResponse = JSON.parse(response.data);
      return { message: 'Clase creada con éxito.', data };
    } catch (error) {
      console.error(`Error web al crear el archivo ${fileName}.md:`, error);
      return { message: 'Error al crear la nueva clase' };
    }
  },

  async updateFileContent(fileName: string, content: string | TMenu[], type: 'markdown' | 'json'): Promise<TServiceResult> {
    try {
      const response = await getDataFile(fileName, type);
      if (response.error) {
        console.error(`Error al actualizar el archivo ${fileName}.${type}:`, response.error);
        return { message: 'Error al guardas los datos.' };
        // throw new Error(`Error al actualizar el archivo: ${response.status}`);
      }
      const data: FileOperationResponse = JSON.parse(response.data);
      return { message: 'Datos guardados con éxito.', data };

    } catch (error) {
      console.error(`Error web al actualizar el archivo ${fileName}.${type}:`, error);
      return { message: 'Error al guardas los datos.' };
    }
  }
}