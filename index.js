#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Marked = require('marked');
const fetch = require('node-fetch');
const mdLinks = require('./lib/md-links');
const [, , ...args] = process.argv;
const arFiles = args[0];
let pathFileAbs = path.resolve(arFiles);


mdLinks(pathFileAbs);

/*
if (require.main === module) {  
  let options = {};
  if (args.includes('--validate')) {
        {validate:true};    
     }
  mdLinks(args[0], options).then((data) => {    
    if (data.length === 0) {  
    
    }   
  }).catch((error) => {
    console.error(error);
  });
}
*/

