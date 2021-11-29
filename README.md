# Coderhouse Entrega Proyecto Javascript


Se uso [Browserify](https://www.npmjs.com/package/browserify) en conjunto con [Watchify](https://www.npmjs.com/package/watchify/v/4.0.0) para implementar [jsclass-serializer](https://www.npmjs.com/package/jsclass-serializer/v/0.2.5) en el script.

Para poder usar la pagina es necesario ejecutar los siguientes comandos en la carpeta raiz del proyecto:
```
npm install
npm run build
```

Al editar el archivo default.js, es necesario actualizar el bundle.js para que se reflejen los cambios en la pagina, usando Watchify se actualiza continuamente el archivo bundle.js al crear modificaciones
```
npm run watch
```

<sub>Por Roberto Artigues</sub>
