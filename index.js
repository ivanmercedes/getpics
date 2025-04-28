#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { URL } = require('url');

function getArgumentValue(flag) {
  const arg = process.argv.find(arg => arg.startsWith(`--${flag}=`));
  if (arg) {
    return arg.split('=')[1];
  }
  return null;
}

async function descargarImagenes() {
  const directorio = getArgumentValue('dir');
  const paginaUrl = getArgumentValue('url');

  if (!directorio || !paginaUrl) {
    console.log("Uso correcto: npx getpics --url=\"https://sitio.com\" --dir=\"nombre_directorio\"");
    process.exit(1);
  }

  if (!fs.existsSync(directorio)) {
    fs.mkdirSync(directorio, { recursive: true });
  }

  try {
    const { data: html } = await axios.get(paginaUrl);
    const dom = new JSDOM(html);
    const imagenes = Array.from(dom.window.document.querySelectorAll('img'));

    if (imagenes.length === 0) {
      console.log("No se encontraron imágenes en la página.");
      return;
    }

    for (let i = 0; i < imagenes.length; i++) {
      const img = imagenes[i];
      let src = img.getAttribute('src');

      if (!src) continue;

      try {
        const imgUrl = new URL(src, paginaUrl).href;
        const respuesta = await axios.get(imgUrl, { responseType: 'arraybuffer' });

        let extension = path.extname(new URL(imgUrl).pathname).toLowerCase();
        if (!['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'].includes(extension)) {
          extension = '.jpg';
        }

        const nombreArchivo = path.join(directorio, `${i + 1}${extension}`);
        fs.writeFileSync(nombreArchivo, respuesta.data);
        console.log(`Imagen ${i + 1} descargada: ${nombreArchivo}`);
      } catch (error) {
        console.log(`No se pudo descargar la imagen ${src}: ${error.message}`);
      }
    }

    console.log("✅ Descarga finalizada.");
  } catch (error) {
    console.error(`Error al acceder a la página: ${error.message}`);
  }
}


descargarImagenes();
