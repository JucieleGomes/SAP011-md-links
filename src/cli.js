#!usr/bin/env	node

const { soma, readFile} = require('./MdLinks.js');

const resultado = soma(1,5);

console.log(resultado);


const input = process.argv;
const filePath = input [2];

readFile(filePath)
.then((fileContent) =>{
const regex = /https?:\/\/[^\s/$.?#].[^\s]*/
const link = fileContent.match(regex);
console.log(link[0]);
})

