import fs from 'fs';
import chalk from 'chalk';

function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
  return resultados.length !== 0 ? resultados : 'Sem links no arquivo';
}

function trataErro(erro) {
  console.log(erro);
  throw new Error(chalk.red(erro.code, 'Sem links no diretório'));
}

// async/await

async function pegaArq(caminhoArq) {
  try {
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(caminhoArq, encoding)
    return extraiLinks(texto);
  } catch (erro) {
    trataErro(erro)
  }
}

export default pegaArq;

module.exports = {
  extraiLinks,
  trataErro,
  pegaArq
}