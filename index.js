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

const fs = require('fs');
const markdownLinks = require('./lib/md-links.js');

window.validateLink = () => {
  const markdown = fs.readFileSync('README.md').toString();
}



const links = markdownLinks(markdown);

links.array.forEach(link => {
  console.log(link);
});

