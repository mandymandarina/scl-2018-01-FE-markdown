#!/usr/bin/env node

const fs = require('fs');
const pathNode = require('path');
const Marked = require('marked');
const fetch = require('node-fetch');
const index = require('./index')

const mdLinks = require('./md-links');
const [, , ...args] = process.argv;

if (require.main === module) {  
  let options = {};
  if (args.includes('--validate')) {
    options.validate = true;  
  }
  mdLinks(args[0], options).then((data) => {
    if (data.length === 0) {  
    console.error('###');
    }
    linksData.forEach(element => {    
    // let resultData = '';
    
    const [, , ...userCLIArgs] = process.argv;
    //Process.argv > ["/usr/bin/node","/home/fabian/Projects/Clases/2018-1-TallerPromesasPathTerminal/app.js"]
    //Por cada espacio se hace un nuevo elemento en process.argv 
    console.log("User args > " + JSON.stringify(userCLIArgs));
    //User args > ["HoliHoli","--validate","--stats"]
    readFilePromise(path.join(process.cwd(), userCLIArgs[0])).then((data) => {
        console.log("Contenido del archivo > " + JSON.stringify(data.split('\n')));
        //forEach((elemento, index)=>{})
    }).catch((error) => {
        console.error("Error > " + error);
    });       
     
  });
  }).catch((error) => {
    console.error(error);
  });
}

