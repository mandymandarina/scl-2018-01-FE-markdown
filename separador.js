#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Marked = require('marked');
const fetch = require('node-fetch');
const [, , ...args] = process.argv;
console.log(`Current directory: ${process.cwd()}`);
const directory = process.cwd();


//extractor de link
const markdown = function markdownLinkExtractor(markdown, line) {
  const links = [];

  const renderer = new Marked.Renderer();


  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport; 


  renderer.link = function(href, title, text) {
    links.push({
      href: href,
      text: text,
      title: title,    
      line: line  
    });
  };
  renderer.image = function(href, title, text) {
      // Remove image size at the end, e.g. ' =20%x50'
      href = href.replace(/ =\d*%?x\d*%?$/, '');
      links.push({
        href: href,
        text: text,
        title: title,
        line: line        
      });
  };
  Marked(markdown, {renderer: renderer});

  return links;
};


// Función que lee un archivo y retorna promesa con su contenido
const mdLinks = function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    const directory = process.cwd();
    let dirRe = Buffer.from(directory);
    fs.readdir(dirRe, (err, files) => {
      if (err) {
        return reject(error);//Sabemos que hay un error, así que rechazamos la promesa
        //Si hay error, también nos aseguramos con return de no seguir ejecutando nada más en esta función
        console.log("###" + err.message);
      } else {
        //console.log(files);
        //return resolve(files); //En caso de que no haya error resolvemos la promesa con los datos que recibimos en el callback
        for (let i = 0; i < files.length; i++) {
          if (path.extname(files[i]) === '.md') {
            //console.log(files[i]);
            fs.readFile(files[i], 'utf8', function (err, data) {
              if (err) {
                console.log(err.message);
              } else {
                //console.log(data);
                //console.log(markdown(data));
                //markdown(data).forEach(element => {
                  //console.log(element.href);
                  let line = (data).split('\n').map((element, index)  => markdown(element, index+1));
                  lineLink = line.filter(element => element.length !== 0);
                  let lineLinksLinks = lineLink.reduce((valueOne, valueTwo)=> valueOne.concat(valueTwo));              
                 console.log(lineLinksLinks);

                 lineLinksLinks.forEach(element =>{                    
                    //console.log(element);
                    console.log(files[i], element.line, element.href);
                  });
                  
                  /*
                  markdown(data).forEach(element => {
                    console.log(element.href)
                   });
                  */
                    
                  /*
                  let line = (data).split('\n').forEach((element, index) => {
                  const linkLine = console.log("##",element, index); 
                  }); 
                  */
                   
                   /* if ({ validate: true }) {
                    fetch(element.href).then((response) => {
                    console.log(files[i], element.href, response.status, response.statusText, element.line);
                      
                    })
                  } else {
                    console.log(err.message);
                  }
                  */
                
              }
            })
          }
        }        
        }
      });
    })
  };
  
  module.exports = mdLinks;
 
/*
 * Función que lee un archivo y retorna promesa con su contenido
 
function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) {
                return reject(error);//Sabemos que hay un error, así que rechazamos la promesa
                //Si hay error, también nos aseguramos con return de no seguir ejecutando nada más en esta función
            }

            return resolve(data); //En caso de que no haya error resolvemos la promesa con los datos que recibimos en el callback
        });
    });
};

console.log("Process.argv > " + JSON.stringify(process.argv));
console.log("CWD > " + process.cwd()); // Me va a indicar donde se está ejecutando el archivo
const [, , ...userCLIArgs] = process.argv;
//Process.argv > ["/usr/bin/node","/home/fabian/Projects/Clases/2018-1-TallerPromesasPathTerminal/app.js"]
//Por cada espacio se hace un nuevo elemento en process.argv 
console.log("User args > " + JSON.stringify(userCLIArgs));
//User args > ["HoliHoli","--validate","--stats"]
readFilePromise(path.join(process.cwd(), userCLIArgs[0])).then((data) => {
    console.log("Contenido del archivo > " + JSON.stringify(data.split('\n')));
    //forEach((elemento, index)=>{})
}).catch((error) => {
    console.error("Error > " + error);
});
*/
/*


/*
 * Función que lee un archivo y retorna promesa con su contenido

function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (error, data) => {
          console.log("Chao");
          if (error) {
              return reject(error); //Sabemos que hay un error, así que rechazamos la promesa
              //Si hay error, también nos aseguramos con return de no seguir ejecutando nada más en esta función
          }
          return resolve(data); //En caso de que no haya error resolvemos la promesa con los datos que recibimos en el callback
      });
      //"Holi" aparecerá antes que "Chao", puesto que readFile es no bloqueante y toma mucho tiempo
      //Entonces, los resultados serán entregados a través de un callback
      console.log("Holi");
  });
};

function readDirPromise(dirPath) {
  return new Promise((resolve, reject) => {
      fs.readdir(dirPath, (error, files) => {
          if (error) {
              return reject(error);
          }
          return resolve(files);
      })
  });
}

console.log("Process.argv > " + JSON.stringify(process.argv));
console.log("CWD > " + process.cwd()); // Me va a indicar donde se está ejecutando el archivo
const [, , ...userCLIArgs] = process.argv;
//Process.argv > ["/usr/bin/node","/home/fabian/Projects/Clases/2018-1-TallerPromesasPathTerminal/app.js"]
//Por cada espacio se hace un nuevo elemento en process.argv 
console.log("User args > " + JSON.stringify(userCLIArgs));
//User args > ["HoliHoli","--validate","--stats"]
fs.readdir(process.cwd(), (error, files) => {
  console.log("Archivos > " + JSON.stringify(files));
  //Archivos > ["app.js"]
  const filePromises = files.map((aFile) => {
      return readFilePromise(aFile);
  });
  Promise.all(filePromises).then((filesData) => { }).catch((error) => {
      console.error("Error > " + error);
  });
});
let miVariableNoTanGlobal;
let miErrorNoTanGlobal;
readDirPromise(process.cwd())
    .then((dirFiles) => {
        const filePromises = dirFiles.map((aFile) => {
            return readFilePromise(aFile);
        });

        return Promise.all(filePromises); //Retorno promesa
    }).then((filesData) => { //Recibo los resultados de la promesa que se retornó en el then anterior
        miVariableNoTanGlobal = filesData;
    }).catch((error) => {
        console.error("Error > " + error);
        miErrorNoTanGlobal = error;
    }).finally(() => { // Es una función que se ejecuta después de TODO
        console.log("Variable no tan global > " + JSON.stringify(miVariableNoTanGlobal));
    })
    */