const fs = require('fs');
const path = require('path');
const Marked = require('marked');
//console.log(`Current directory: ${process.cwd()}`);
//const direccion3 = process.cwd();
// funcion extraer links
//let mdLinks = {};

/*
mdLinks.linksLineValidate = (path, options) => {
  
  return new Promise((resolve, reject) => {// aca se declara la promersa
    let dataLine = fs.readFileSync(path, 'utf8').split('\n');
    let line = (dataLine).split('\n').forEach((element, index) => {
      const linkLine = console.log(index); 
    });
    line = line.filter(element => 
      element.length !== 0);
    if (line.length !== 0) 
    line = line.reduce((element1, element2) => element1.concat(element2));
    if (validate) {
      mdLinks.validateLink(links).then((values) =>{
        Promise.all(values).then((values) =>{
          if (stats) resolve(mdLinks.stats(values));
          else resolve(values);
        });
      });
    } else resolve(links);
  });
 
   
};

mdLinks.validateLink = (links) =>{
  return new Promise((resolve, reject) => {
    let promises = [];
    links.forEach((link)=>{
      promises.push(fetch(link.href)
        .then(res => {
          link.status = res.status;
          link.ok = res.statusText;
          return link;
        }).catch((e) =>{
          link.status = 'fail';
          link.ok = 'fail';
          return link;
        })
      );
      resolve(promises);
    });
  });
};

*/
const mdLinks = function markdownLinkExtractor(markdown, line) {
  const links = [];

  const renderer = new Marked.Renderer();


  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport; 


  renderer.link = function(href, title, text, line) {
    links.push({
      href: href,
      text: text,
      title: title,
      line: line,      
    });
  };
  renderer.image = function(href, title, text) {
      // Remove image size at the end, e.g. ' =20%x50'
      href = href.replace(/ =\d*%?x\d*%?$/, '');
      links.push({
        href: href,
        text: text,
        title: title,        
      });
  };
  Marked(markdown, {renderer: renderer});

  return links;
};

module.exports = mdLinks;

