const fs = require('fs');
const path = require('path');
const input = process.argv;
const filePath = input[2];



function mdLinks(dir, options) {
  const directories = fs.readdirSync(dir);
  let foundMdFile = false;

  for (const directory of directories) {
    const dirPath = path.join(dir, directory);
    const stats = fs.statSync(dirPath);
    
    if (stats.isDirectory()) {
      mdLinks(dirPath);
    }

    if (path.extname(dirPath) === '.md') {
      foundMdFile = true;
      return readMdFile(dirPath, options)
  }}

  if(!foundMdFile){
    throw new Error("There are no .md files in the directory");
  } 
}

function readMdFile(filePath, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
    .then((fileContent) => {
      const regex = /\[(.*?)\]\((https?:\/\/[^\s/$.?#].[^\s]*)\)/g;
      const links = [...fileContent.matchAll(regex)];
      const linksInfo = links.map((link) => ({
        title: link[1],
        url: link[2],
        path: filePath,
      }));

      if (options.validate && options.stats) {
        const validationPromises = linksInfo.map((link) => validateLinks(link));
        return Promise.all(validationPromises)
          .then((links) => {
            return  statsLinks(links);
          })

      } else if (options.validate) {
        const validationPromises = linksInfo.map((link) => validateLinks(link));
        return Promise.all(validationPromises)

      } else if (options.stats) {
        return statsLinks(links);
      }
      return linksInfo;
    })
    .catch((error) => {
     return error.message;
    });
}

function validateLinks(link) {
 return fetch(link.url)
    .then((response) => {
      link.status = response.status;

      if (response.status === 200) {
        link.isValid = true;

      } else if (response.status !== 200) {
        link.isValid = false;
      }

      return link

    })
    .catch((error) => {
      return error.message;
    });
}

function statsLinks(links) {

  const validLinks = links.filter((link) => link.status === 200).length;
  const invalidLinks = links.filter((link) => link.status !== 200).length;
  const uniqueLinks = [...new Set(links.map((link) => link.url))].length;
  const totalLinks = links.length;

  return {
    validLinks,
    invalidLinks,
    uniqueLinks,
    totalLinks,
  }

}

mdLinks(filePath);


module.exports = { readMdFile, mdLinks };