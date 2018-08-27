const assert = require('chai').assert;
global.window = global;
require('../lib/md-links');
require('../index.js');
require('../validate');
const fs = require('fs');

describe('validar string', () => {  
  it('The result is a string', () => {
    const link = 'https://es.wikipedia.org/wiki/Markdow' 
    const linkStr = link;
    assert.typeOf(linkStr, 'string');
  })
  });  

describe('deberia retornar', function() {  
 const  link = function(href, title, text){};
    it('devuelve arreglo', function() {
      links.push({
        href: href,
        text: text,
        title: title,      
      });   
});
});

describe('#split()', function() {    
  it('should return -1 when the value is not present', function() {
    fetch(element.href).then((response) => {                
      //console.log(files[i], element.href, response.status, response.statusText);                    
  })
  assert.typeOf(files, 'string');
});
});

