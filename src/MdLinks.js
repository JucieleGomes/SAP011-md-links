
const fs = require("fs");
const path = require("path");

function readFile(filePath){
 return new Promise((resolve, reject) => {
    fs.readFile(filePath,"utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
  })
});

}
const root = './test/Files';
let data = {};
let counter = 0;

function mdLinks(dir) {
  const directories = fs.readdirSync(dir); 

  for(directory of directories){
    const dirPath = path.join(dir, directory)
    const stats = fs.statSync(dirPath)
  
    if(stats.isDirectory()){
      mdLinks(dirPath)
    }else{
      data[counter] = {  
        Name: path.dirname(dirPath),
        Path: dirPath,
        type: path.extname(dirPath)
    }

    counter =+ 1;

  }

}
}

mdLinks(root);

console.log(data);



module.exports = {readFile, mdLinks}
