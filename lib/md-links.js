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
const options = require('../index');
const colors = require('colors');
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

const mdLinks = function readFilePromise(pathFileAbs) {   
        if (path.extname(pathFileAbs) === '.md') {      
          //console.log(pathFileAbs);          
          fs.readFile(pathFileAbs, 'utf8', function (err, data) {
            if (err) {
              console.log(err.message);
            } else {
              //console.log(pathFileAbs);            
              //console.log(data);
              //console.log(markdown(data));
              //markdown(data).forEach(element => {
                //console.log(element.href);
                let line = (data).split('\n').map((element, index)  => markdown(element, index+1));
                //console.log(line);
                if(line !== null){
                lineLink = line.filter(element => element.length !== 0);
                //console.log(lineLink);
                let lineLinksLinks = lineLink.reduce((valueOne, valueTwo)=> valueOne.concat(valueTwo),[]);
                //console.log(lineLinksLinks);               
               lineLinksLinks.forEach(element =>{             
                  //console.log(element);                                
                    if(options.validate === '--validate'){                        
                      fetch(element.href).then((response) => {
                        console.log('Ruta: '+ pathFileAbs.blue,'linea: '+ element.line, 'Link: '+ element.href.green, 'Estado: ' + response.status, response.statusText.red);      
                        }).catch((error) => {
                          console.error("Error: no encontro links" + error);
                      });                       
                  }else{
                    console.log('Ruta: '+ pathFileAbs.blue, 'Linea: '+ element.line, 'Link: '+ element.href.green);              
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
                
              } else {
                console.log(err.message);
              }
            }
          })
        } 
};

/*
const mdLinks = function readFilePromise(pathFileAbs) {    
    const directory = process.cwd();
    let dirRe = Buffer.from(directory);
    fs.readdir(pathFile() || dirRe, (err, files) => {
      if (err) {        
        console.log("###" + err.message);
      } else {
        //console.log(files);
        //return resolve(files); //En caso de que no haya error resolvemos la promesa con los datos que recibimos en el callback
        for (let i = 0; i < files.length; i++) {
          if (path.extname(files[i]) === '.md') {
            //console.log(files[i]);
            let filePath = pathFile() + '\\' + files[i];
            fs.readFile(filePath, 'utf8', function (err, data) {
              if (err) {
                console.log(err.message);
              } else {
                console.log(files[i]);
                
                //console.log(data);
                //console.log(markdown(data));
                //markdown(data).forEach(element => {
                  //console.log(element.href);
                  let line = (data).split('\n').map((element, index)  => markdown(element, index+1));
                  //console.log(line);
                  if(line !== null){
                  lineLink = line.filter(element => element.length !== 0);
                  //console.log(lineLink);
                  let lineLinksLinks = lineLink.reduce((valueOne, valueTwo)=> valueOne.concat(valueTwo),[]);
                  //console.log(lineLinksLinks);               
                 lineLinksLinks.forEach(element =>{             
                    //console.log(element);                                
                      if(options.validate === '--validate'){                        
                        fetch(element.href).then((response) => {
                          console.log('Archivo: '+ files[i].blue,'linea: '+ element.line, 'Link: '+ element.href.green, 'Estado: ' + response.status, response.statusText.red);      
                          }).catch((error) => {
                            console.error("Error: no encontro links" + error);
                        });                       
                    }else{
                      console.log('Archivo: '+ files[i].blue, 'Linea: '+ element.line, 'Link: '+ element.href.green);              
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
                  /*
                } else {
                  console.log(err.message);
                }
              }
            })
          }
        }        
        }
      });
    
  };
  */
  
  module.exports = mdLinks;
 