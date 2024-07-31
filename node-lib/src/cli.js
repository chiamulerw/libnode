import chalk from 'chalk';
import fs from 'fs';
import pegaArq from './index.js';

const caminho = process.argv;

function imprimeLista(resultados, identificadores = '') {
  console.log(
    chalk.yellow('Links em lista'),
    chalk.black.bgGreen(identificadores),
    resultados);
}

async function processaTex(argumentos) {
  const caminho = argumentos[2];

  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.log('Arquivo/diretório não existente');
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultados = await pegaArq(argumentos[2]);
    imprimeLista(resultados);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho)
    arquivos.forEach(async (nomeArquivo) => {
      const lista = await pegaArq(`${caminho}/${nomeArq}`)
      imprimeLista(lista, nomeArq)
    })
  }
}

processaTex(caminho);