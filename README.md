# MARKDOWN LINKS

![markdown](https://user-images.githubusercontent.com/39128913/47227125-79fe5180-d398-11e8-8100-d50b0c12137c.png)

En este proyecto se realizó una dependencia de node.js para poder extraer links de un archivo en formato ".md", todo esto se puesta en la terminal con una lista de los links que contiene, mas el numero de linea en el que se encuentra dentro del archivo y por ultimo, tambien se puede ejecutar un comando para saber el estado del link., ya sea si la pagina esta en funcionamiento o esta caida.  

## Para poder ejecutarlo

Para poder ejetutar esta libreria, debes instalar en tu proyecto las siguientes dependecias de antemano:

- `Marked con el comando:`
```sh
 $npm install --save marked
 ```

- `node-fetch con el comando:` 
```sh
$npm install node-fetch --save
```

## Para la instalación
Por la pagina node.js se puede hacer la instalación de este modo.
para poder integrarlo en tu proyecto es necesario que sigas los siguientes pasos:

- Para instalar debes colocar lo siguiente:

```sh
$npm install search-links -g
```
- Luego de esto, ejecutas el comando a contunuación, son los que te devolveran una lista de los links que contiene el archivo.

```sh
$ mdlinks <ruta-del-archivo> 
```
ó también puedes ejecutar

```sh
$ mdlinks <nombre-de-archivo.md> 
```

Como se mencionó con anterioridad, también se puede obteber la información sobre si el link esta roto o no, para esto se ejecuta el siguiente comando:

```sh
$ mdlinks <ruta-del-archivo> --validate
```
ó

```sh
$ mdlinks <nombre-de-archivo.md> --validate
```

## Documentación

- `NPM:`(https://docs.npmjs.com/getting-started/what-is-npm)
- `CLI:`(https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)
- `File System:`(https://nodejs.org/api/fs.html)
- `Módulos Node.js`(https://docs.npmjs.com/getting-started/publishing-npm-packages)
-`Leer un archivo:`https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)
- `Leer un Directorio:`(https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)

El proyecto se subió a Github y se puede encontrar dando clik en el siguiente [link](https://github.com/mandymandarina/scl-2018-01-FE-markdown)

Para esta instalación debes descargar el archivo en el links anterior, extraer el archivo descargado desde el zip, Instalar npm install -g (desde su consola)





