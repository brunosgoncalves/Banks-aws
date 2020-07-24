const aws = require('./src/aws');
const path = require('path');
const fs = require('fs');
const schedule = require('node-schedule');
const date = new Date();
const directoryPath = path.resolve(__dirname, 'aws-itau');

var agendador = schedule.scheduleJob('*/2 * * * * *', function () {
  if (date.getHours() >= '23') {
    console.log("fora de horario");
    agendador.cancel();
    process.exit(1);

  }
  console.log("Iniciando");
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      const fullPath = path.resolve(directoryPath, file);
      console.log(fullPath);
      try {
        aws.upload(fullPath)
        aws.deleta_arquivos(fullPath)
      } catch (error) {
        console.log('ERRO: ', error)
      }
    });
  });
  console.log('Bora la agora vai!!!!');
});
// aws.listFiles()

