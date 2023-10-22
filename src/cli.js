#!/usr/bin/env node

const { readFile } = require('./MdLinks.js');

const input = process.argv;
const filePath = input[2];

readFile(filePath, 'utf-8')
  .then((fileContent) => {
    const regex = /https?:\/\/[^\s/$.?#].[^\s]*/g;
    const links = fileContent.match(regex);

    if (links) {
      for (let index = 0; index < links.length; index++) {
        const link = links[index];

fetch(link) 
  .then(response => {

    const url = response.url;
    const status = response.status;

    if (!response.ok) {
     console.log(`Invalid URL: ${url} Status: ${status}`);
    }
    if (response.status === 200) {
      console.error(`Valid URL: ${url} Status: ${status}`);
    }
  })
  .catch(error => {
    console.error('Ocorreu um erro na requisição', error);
  });
      }
    } else {
      console.log('Nenhum link encontrado no arquivo.');
    }
  })
  .catch((error) => {
    console.error('Ocorreu um erro ao ler o arquivo:', error);
  });



 