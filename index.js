const aws = require('./src/aws');
const path = require('path');
const fs = require('fs');

const directoryPath = path.resolve(__dirname, 'aws-itau');

fs.readdir(directoryPath, function (err, files) {
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  } 
  files.forEach(function (file) {
      const fullPath = path.resolve(directoryPath, file);
      console.log(fullPath); 
      try {
        aws.upload(fullPath)
      } catch (error) {
        console.log('ERRO: ', error)  
      }
    });
});

// aws.listFiles()

console.log('Bora la agora vai!!!!');