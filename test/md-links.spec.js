const assert = require('chai').assert;
global.window = global;
require('../lib/md-links');

describe('validar funcion', () => {  
  it('debería exponer función mdLinks', () => {
    assert.isFunction(mdLinks);
  });
});

