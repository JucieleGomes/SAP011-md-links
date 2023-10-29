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
    const regex = /\[(.*?)\]\((https?:\/\/[^\s/$.?#].[^\s]*)\)/g;
    const links = [...fileContent.matchAll(regex)]


    const linksInfo = links.map((link) => ({
      Title: link[1],
      url: link[2],
      Path: filePath,
    }));
 
   
    linksInfo.map((link) => {
      validateLinks(link);
    });
    statsLinks(linksInfo);
    
   return linksInfo


  

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
    
    if (stats.isDirectory()) {
      mdLinks(dirPath);
    }
    
    if (path.extname(dirPath) === '.md') {
      foundMdFile = true;
      readFile(dirPath)
      counter += 1;
      
    } if(!foundMdFile){
      console.log("There are no .md files in the directory");
    }
  }
}

function validateLinks(link) {
  fetch(link.url)
    .then((response) => {
      link.status = response.status;

      if (response.status === 200) {
        link.isValid = true;
       console.log("Valid Link:", link.url, link.status);

      } else if (response.status !== 200) {
        link.isValid = false;
        console.log("Invalid link:" , link.url, link.status);
   
      }
    return link  

    })
    .catch((error) => {
      console.error('Ocorreu um erro na requisição', error);
    });
}
  

function statsLinks(links) {
  console.log(links);

  const validLinks = links.filter((link) => link.status === 200);
  const invalidLinks = links.filter((link) => link.status !== 200);
  const totalLinks = links.length;
  console.log('Valid links:', validLinks.length);
  console.log('Broken links:', invalidLinks.length);
  console.log('Total Links:', totalLinks);
}

mdLinks(filePath);


module.exports = { readFile, mdLinks };