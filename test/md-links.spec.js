const assert = require('chai').assert;
global.window = global;
require('../lib/md-links');

describe('validar funcion', () => {  
  it('debería exponer función mdLinks', () => {
    assert.isFunction(markdownLinkExtractor);
  });
  
  it("Check the returned value using: assert.typeOf(value,'value'): ", function() {
    result   = calculator.addTested("text");
    assert.typeOf(result, "string");
    
        });  
    
  it('links es un objeto', () => {
    assert.isObject(links);
  });
});

describe('markdownLinkExtractor(markdown)', () => {
  it('debería ser una función', () => {
    //assert.isFunction(mdLinks.markdownLinkExtractor);
    assert.equal(typeof markdownLinkExtractor, 'function');
  });
});