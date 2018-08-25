#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Marked = require('marked');
const mdLinks = require('./lib/md-links');
const fetch = require('node-fetch');
const [, , ...args] = process.argv;

// me entrega la ruta de mis archivos a recorrer
//console.log(`Current directory: ${process.cwd()}`);
//const directory = process.cwd();
//let directory2 = 'md';
// transforma el contenido del archivo a strin
console.log(`Directorio actual: ${__dirname}`);
const directory = __dirname;
let dirRe = Buffer.from(directory);
//let dirpath = Buffer.from(path);

fs.readdir(dirRe, (err, files) => {
  if(err){
    console.log("###"+err.message);
  }else{
    console.log(files);
  }  
  console.log(files);
  for (let i = 0; i < files.length; i++) {
    if (path.extname(files[i]) === '.md') {
     console.log(files[i]);
     fs.readFile(files[i], 'utf8', function (err, data){
       if (err) {
        console.log(err.message);
      } else{            
        console.log(data);           
        console.log(mdLinks(data));
        mdLinks(data).forEach(element =>{
        console.log(element.href);
        /*
        let result = data;
        let resultTwo = element.href.indexOf('element');        
        for (let i=0; i < resultTwo.length; i++){
          console.log('pp' + resultTwo[i]);
        }
        */
       let line = data.split('\n');
       line.forEach(element =>{
         let linksLine = element.indexOf('https')
        console.log(linksLine);
       }); 
       
      /* console.log(nks);
       for(let i = 0; i < nks.length; i++)
          console.log(nks[i]);  */  
                   
           
            /*
            fs.readFileSync('./input.txt').toString().split('n').forEach(function (line) { 
                console.log(line);
                fs.appendFileSync("./output.txt", line.toString() + "n");
            });
                        */
       
        if ({validate:true}){
        fetch(element.href).then((response) => {
          
          console.log(files[i], element.href, response.status, response.statusText);
          //console.log(response.statusText);
          
        
        }) 
      } else {
        console.log(err.message);
      }   
        })
      }    
     })
    }
  }  
});

/*
"use strict";

var fs = require('fs');
var markdownLinkExtractor = require('markdown-link-extractor');

var markdown = fs.readFileSync('README.md').toString();

var links = markdownLinkExtractor(markdown);

links.forEach(function (link) {
    console.log(link);
});
*/

/*
const fs = require('fs');
const markdownLinks = require('./lib/md-links.js');

window.validateLink = () => {
  const markdown = fs.readFileSync('README.md').toString();
}



const links = markdownLinks(markdown);

links.array.forEach(link => {
  console.log(link);
});
*/




