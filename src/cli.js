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
        console.log(link);
        fetch(link) 
  .then(response => {
    if (!response.ok) {
      throw new Error('falhou a requisição');
    }
    if (response.status === 200) {
      console.log('Link válido');
    }

    if (response.status === 404) {
      throw new Error('não encontrou qualquer resultado');
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



 