#!/usr/bin/env node

//console.log(`Current directory: ${process.cwd()}`);
//const direccion3 = process.cwd();
const fs = require('fs');
const path = require('path');
const Marked = require('marked');
const fetch = require('node-fetch');
const markdown = require('./markdown')
const [, , ...args] = process.argv;
console.log(`Current directory: ${process.cwd()}`);

const options = require('../index')
console.log('process.argv: ' + JSON.stringify(process.argv));
options.validate = process.argv[3];
// console.log(JSON.stringify(options.validate));


// Construcción de la ruta para buscar el archivo.

/*
const pathFile = function readPathFile() {
  if (process.argv[2] !== undefined) {    
    const directory = process.cwd();
    let pathFile = process.argv[2];
    let pathFileAbs = path.resolve(pathFile);
    console.log('ruta: ' + pathFileAbs);
    let routePath = true;
    return pathFileAbs;
  } else {
    const err= 'ingresa la ruta al archivo despues del comando';
    console.error(err);
  }
  return;
};
*/



// Función que lee un archivo y retorna promesa con su contenido
const mdLinks = function readFilePromise(filePath) {    
    const directory = process.cwd();
    let dirRe = Buffer.from(directory);
    fs.readdir(dirRe, (err, files) => {
      if (err) {        
        console.log("###" + err.message);
      } else {
        //console.log(files);
        //return resolve(files); //En caso de que no haya error resolvemos la promesa con los datos que recibimos en el callback
        for (let i = 0; i < files.length; i++) {
          if (path.extname(files[i]) === '.md') {
            //console.log(files[i]);
            fs.readFile(files[i], 'utf8', function (err, data) {
              if (err) {
                console.log(err.message);
              } else {
                //console.log(data);
                //console.log(markdown(data));
                //markdown(data).forEach(element => {
                  //console.log(element.href);
                  let line = (data).split('\n').map((element, index)  => markdown(element, index+1));
                  lineLink = line.filter(element => element.length !== 0);
                  let lineLinksLinks = lineLink.reduce((valueOne, valueTwo)=> valueOne.concat(valueTwo));              
                 //console.log(lineLinksLinks);

                 lineLinksLinks.forEach(element =>{             
                    //console.log(element);                                
                      if(options.validate === '--validate'){                        
                        fetch(element.href).then((response) => {
                          console.log(files[i],element.line, element.href, response.status, response.statusText);      
                          }).catch((error) => {
                            console.error("Error: no encontro links" + error);
                        });                       
                    }else{
                      console.log(files[i], element.line, element.href);              
                    }
                  });                     
                  /*
                  let line = (data).split('\n').forEach((element, index) => {
                  const linkLine = console.log("##",element, index); 
                  }); 
                  */ 
                 /*                 
                   if ({ validate: true }) {
                    fetch(element.href).then((response) => {
                    console.log(files[i], element.href, response.status, response.statusText, element.line);
                      
                    })
                  } else {
                    console.log(err.message);
                  }
                  */
                  
                
              }
            })
          }
        }        
        }
      });
    
  };
  
  module.exports = mdLinks;
 

