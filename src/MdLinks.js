
const fs = require("fs");

function readFile(filePath){
 return new Promise((resolve, reject) => {
    fs.readFile(filePath,"utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
  })
});

}




module.exports = {readFile}
