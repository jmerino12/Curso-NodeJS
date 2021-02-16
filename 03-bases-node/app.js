const { option, boolean } = require('yargs');
const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('yargs')
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true
    }).check((argv, options) => {
        if (isNaN(argv.b)) {
            throw 'La  base tiene que se un numero';
        } else {
            return true;
        }
    }).option('l', {
        alias: 'listar',
        type: boolean,
        default: false,
        describe: 'Comando para listar'
    }).argv;

console.clear();

console.log('base yargs', argv.base);
console.log('base yargs', argv);



/*const [, , arg3 = 'base=5'] = process.argv
const [, base = 5] = arg3.split('=');
console.log(base);
let numerotabla = 3;*/

crearArchivo(argv.b, argv.l)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));