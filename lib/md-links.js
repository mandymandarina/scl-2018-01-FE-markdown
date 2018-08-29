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
const directory = process.cwd();


// Función que lee un archivo y retorna promesa con su contenido
const mdLinks = function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    const directory = process.cwd();
    let dirRe = Buffer.from(directory);
    fs.readdir(dirRe, (err, files) => {
      if (err) {
        return reject(error);//Sabemos que hay un error, así que rechazamos la promesa
        //Si hay error, también nos aseguramos con return de no seguir ejecutando nada más en esta función
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
                    if({validate:false}){
                      console.log(files[i], element.line, element.href);
                    } else if ({validate:true}){
                    fetch(element.href).then((response) => {
                      console.log(files[i],element.line, element.href, response.status, response.statusText);          
                      })
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
    })
  };
  
  module.exports = mdLinks;
 

