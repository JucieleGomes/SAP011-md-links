const fs = require("fs");
const path = require("path");



function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data)
    })
  }).then((fileContent) => {
  
    const regex = /https?:\/\/[^\s/$.?#].[^\s]*/g;
    const links = fileContent.match(regex);

    if (links) {
      for (let index = 0; index < links.length; index++) {
        const link = links[index];
        validateLinks(link); 
      }
    } else {
      console.log('Nenhum link encontrado no arquivo.');
    }
}) 
.catch((error) => {
  console.error('Ocorreu um erro ao ler o arquivo:', error);
});
}

const root = './test/Files';
let counter = 0;

function mdLinks(dir) {
  const directories = fs.readdirSync(dir);

  for (const directory of directories) {
    const dirPath = path.join(dir, directory);
    const stats = fs.statSync(dirPath);

    if (stats.isDirectory()) {
      mdLinks(dirPath);

    } 
    
    if(path.extname(dirPath) === '.md') {
      foundMdFile = true;
      readFile(dirPath)
      console.log(dirPath);
      counter += 1;
    } if(!foundMdFile){
      console.log("There are no .md files in the directory");
    }
  }
}

mdLinks(root);

function validateLinks(link) {
  fetch(link)
    .then((response) => {
      const url = response.url;
      const status = response.status;

      if (!response.ok) {
        console.log(`Invalid URL: ${url} Status: ${status}`);
      } else if (response.status === 200) {
        console.log(`Valid URL: ${url} Status: ${status}`);
      }
    })
    .catch((error) => {
      console.error('Ocorreu um erro na requisição', error);
    });
}


// module.exports = { readFile, mdLinks };


// const fs = require("fs");
// const path = require("path");


// function readFile(filePath) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, "utf8", (err, data) => {
//       if (err) reject(err);
//       resolve(data);
//     });
//   });
// }

// const root = './test/Files';
// let data = [];
// let counter = 0;

// function mdLinks(dir) {
//   const directories = fs.readdirSync(dir);

//   for (const directory of directories) {
//     const dirPath = path.join(dir, directory);
//     const stats = fs.statSync(dirPath);

//     if (stats.isDirectory()) {
//       mdLinks(dirPath);

//     } else if (path.extname(dirPath) === '.md') {
//       data.push({
//         Name: path.basename(dirPath),
//         Path: dirPath,
//         type: path.extname(dirPath),
//       });

//       counter += 1;
//     }
//   }
// }

// mdLinks(root);

// console.log(data);

