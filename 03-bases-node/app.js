const { crearArchivo } = require('./helpers/multiplicar');
console.clear();


let numerotabla = 3;

crearArchivo(numerotabla).then(msg => console.log(msg)).catch(err => console.log(err));