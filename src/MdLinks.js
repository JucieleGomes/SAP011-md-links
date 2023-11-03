const fs = require('fs');
const path = require('path');

function readMdFile(filePath, options) {
  return new Promise((resolve, reject) => {
    //Verifica se o caminho do arquvio é .md se sim 
    //segue adinate
    if (path.extname(filePath) === '.md') {
      //Faz a leitura do aqruivo
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const regex = /\[(.*?)\]\((https?:\/\/[^\s/$.?#].[^\s]*)\)/g;
          const links = [...data.matchAll(regex)];
          const linksInfo = links.map((link) => ({
            title: link[1],
            url: link[2],
            path: filePath,
          }));

          if (linksInfo.length === 0) {
            reject(new Error('The file is empty or does not contain any links.'));
          } else {
            if (options.validate && options.stats) {
              const validationPromises = linksInfo.map((link) => validateLinks(link));
              Promise.all(validationPromises)
                .then((links) => {
                  return statsLinks(links);
                })
                .catch((error) => {
                  reject(error);
                  console.log(error.message);
                });
            } else if (options.validate) {
              const validationPromises = linksInfo.map((link) => validateLinks(link));
              Promise.all(validationPromises)
                .then((links) => {
                  return links;
                })
                .catch((error) => {
                  reject(error);
                  console.log(error.message);
                });
            } else if (options.stats) {
              return statsLinks(linksInfo);
            } else {
              return linksInfo;
            }
          }
        }
      });
      //Caso não seja md cai no caso de erro e retorna a mensagem
    } else {
      const error = new Error('It is not possible to continue, the file is not .md');
      reject(error);
    }
  });
}


function validateLinks(link) {
  return fetch(link.url)
    .then((response) => {
      link.status = response.status;

      if (response.status === 200) {
        link.isValid = true;
      } else {
        link.isValid = false;
      }

      return link;
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
  };
}


module.exports = { readMdFile, statsLinks, validateLinks };
