const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('yargs').argv;
console.clear();

console.log(process.argv);
console.log(argv);

console.log('base yargs', argv.base);


/*const [, , arg3 = 'base=5'] = process.argv
const [, base = 5] = arg3.split('=');
console.log(base);
let numerotabla = 3;*/

/*crearArchivo(base)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));*/