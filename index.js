#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const [, , ...args] = process.argv;
const mdLinks = require('./lib/md-links');

fs.readdir(`${args}`, (err, data) => {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    if (path.extname(data[i]) === '.md') {
     console.log(data[i]);
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




