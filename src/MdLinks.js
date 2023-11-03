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
          //Se o array de links for menor que zero
          //retorna um erro que o arquivo está vazio
          if (linksInfo.length === 0) {
            reject(new Error('The file is empty or does not contain any links.'));
          } else {
            //If para validate e stats
            if (options.validate && options.stats) {
              const validationPromises = linksInfo.map((link) => validateLinks(link));
              //retorna a promisse depois de todos as promisses resolvidas
              Promise.all(validationPromises)
                .then((links) => {
              //Retorna o resolve da promise
                  resolve (statsLinks(links));
                })
                .catch((error) => {
                  reject(error);
                });
              // if para o validate
            } else if (options.validate) {
              const validationPromises = linksInfo.map((link) => validateLinks(link));
              Promise.all(validationPromises)
                .then((links) => {
                  resolve(links);
                })
                .catch((error) => {
                  reject(error);
                });
            //if para o stats
            } else if (options.stats) {
            //retorna o resolve
              resolve(statsLinks(linksInfo));
            } else {
            //Caso não seja passada nenhuma options retorna
            //array linksInfo contendo as informações dos links
              resolve(linksInfo);
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
  //Retorna a promisse
  return fetch(link.url)
    .then((response) => {
      //atribui o valor da response ao link.status
      link.status = response.status;
      //if para link válido
      if (response.status === 200) {
        link.isValid = true;
      } else {
      //else para link inválido
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
  //Usa o método set que verifica os itens unicos de um array, passando o
  //link.url para verificar se o link é unico
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
