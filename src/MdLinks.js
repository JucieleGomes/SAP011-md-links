const fs = require("fs");
const path = require("path");
const input = process.argv;
const filePath = input[2];



function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  }).then((fileContent) => {
    const regex = /https?:\/\/[^\s/$.?#].[^\s]*/g;
    const links = [...fileContent.matchAll(regex)]

    const linksInfo = links.map((link) => ({
      Title: link[1],
      url: link[0],
      Path: filePath,
    }));
    
    linksInfo.map((link) => {
      validateLinks(link);
    });

  }).catch((error) => {
    console.error('Ocorreu um erro ao ler o arquivo:', error);
  });
}


let counter = 0;

function mdLinks(dir) {
  const directories = fs.readdirSync(dir);

  for (const directory of directories) {
    const dirPath = path.join(dir, directory);
    const stats = fs.statSync(dirPath);
    
    //Se for um diretório chama a md para explorar
    //os subdiretórios
    if (stats.isDirectory()) {
      mdLinks(dirPath);
    } 
    
    //Se for um arquivo verifica se aextensão
    // é md.
    if(path.extname(dirPath) === '.md') {
      foundMdFile = true;
      readFile(dirPath)
      counter += 1;
      
    } if(!foundMdFile){
      console.log("There are no .md files in the directory");
    }
  }
}

mdLinks(filePath);

function validateLinks(link) {
  fetch(link.url)
    .then((response) => {
      const url = link.url;
      const status = response.status;
      const title = link.Title

      if (!response.ok) {
        console.log(`${title} - Invalid URL: ${url} Status: ${status}`);
      } else if (response.status === 200) {
        console.log(`${title} - Valid URL: ${url} Status: ${status}`);
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

