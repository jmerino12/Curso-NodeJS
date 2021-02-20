const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs');
const colors = require('colors');

console.clear();

console.log('base yargs', argv.base);
console.log('base yargs', argv);



/*const [, , arg3 = 'base=5'] = process.argv
const [, base = 5] = arg3.split('=');
console.log(base);
let numerotabla = 3;*/

crearArchivo(argv.b, argv.h, argv.l)
    .then(msg => console.log(msg.rainbow))
    .catch(err => console.log(err));