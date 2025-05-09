const fs = require('node:fs/promises');
const path = require('node:path');

async function getMarkdownFiles(dirPath) {
  try {
    const items = await fs.readdir(dirPath, { withFileTypes: true });
    const result = [];

    for (const item of items) {
      const itemPath = path.join(dirPath, item.name);

      if (item.isDirectory()) {
        const subItems = await getMarkdownFiles(itemPath);
        result.push({
          name: item.name,
          type: 'folder',
          children: subItems,
        });
      } else if (item.isFile() && item.name.endsWith('.md')) {
        result.push({
          name: item.name,
          type: 'file',
        });
      }
    }

    return result;
  } catch (err) {
    console.error('Error al leer el directorio:', err);
    return null;
  }
}

async function main() {
  const publicFolderPath = path.join(__dirname, 'public', 'markdrowns'); // Ajusta la ruta si es necesario
  const markdownStructure = await getMarkdownFiles(publicFolderPath);

  if (markdownStructure) {
    console.log(JSON.stringify(markdownStructure, null, 2));
    // Aquí podrías enviar esta estructura como respuesta a una petición desde tu página web
  }
}

main();
