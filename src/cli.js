#!usr/bin/env	node

const {readFile} = require('./MdLinks.js')

const input = process.argv;
const filePath = input [2];



readFile(filePath, 'utf-8')
  .then((fileContent) => {
    const regex = /https?:\/\/[^\s/$.?#].[^\s]*/g;
    const links = fileContent.match(regex);

    if (links) {
      for (let index = 0; index < links.length; index++) {
        const link = links[index];
        console.log(link);
      }
    } else {
      console.log('Nenhum link encontrado no arquivo.');
    }
  })
  .catch((error) => {
    console.error('Ocorreu um erro ao ler o arquivo:', error);
  });

