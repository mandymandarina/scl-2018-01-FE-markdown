#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const [, , ...args] = process.argv;
const mdLinks = require('./lib/md-links');

console.log(`Current directory: ${process.cwd()}`);

const directory = process.cwd();
let directory2 = 'md';
let dirBuf = Buffer.from(directory);

fs.readdir(dirBuf, (err, files) => {
  if(err){
    console.log(err.message);
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




