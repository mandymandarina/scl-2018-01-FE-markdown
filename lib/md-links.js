const fs = require('fs');
const path = require('path');
const Marked = require('marked');
//console.log(`Current directory: ${process.cwd()}`);
//const direccion3 = process.cwd();
// funcion extraer links
const mdLinks = function markdownLinkExtractor(markdown) {
  const links = [];

  const renderer = new Marked.Renderer();


  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.newline.link = linkWithImageSizeSupport;

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