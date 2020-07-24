
const fs = require('fs');
const AWS = require("aws-sdk");
const path = require('path')
const readline = require('readline');

const credentials = new AWS.SharedIniFileCredentials({profile: 'itau'});
AWS.config.credentials = credentials;

const s3 = new AWS.S3();

const upload =  (fullPath) => {
    const fileName =  path.basename(fullPath)

    const fileContent = fs.readFileSync(fullPath);

    const options = {
        Bucket: 'itau-datasupplier-zanc-dev-sa-east-1-7631',
        Key: fileName,
        Body: fileContent,
    };

    s3.putObject(options, (err, res) => {
        if(err) throw err;
        console.log('File uploaded successfully.');
        console.log('SUCESSO', res);
    });
}

const listFiles = () => {
    const options = {
        Bucket: 'itau-datasupplier-zanc-dev-sa-east-1-7631',
    };

    s3.listObjects(options, (err, data) => {
        if(err) throw err;
        console.log('Files:');
        console.log(data);
    });
};


const deleta_arquivos = (fullPath) => {
    const fileName = path.basename(fullPath)
    fs.unlinkSync('./aws-itau/'+fileName, (erro) => {
        if(erro) throw new Error(`Erro ao deletar ${erro}`);
        })
    // fs.appendFile("./logs/log.txt" , rl.resume() , (error) => {
    //         if(error) throw error;
    //         console.log("LOG  SALVO");
    // } )
    console.log('File delete successfully.'); 
}




module.exports = {
    upload,
    listFiles,
    deleta_arquivos
}
