
const { option, boolean } = require('yargs');
const argv = require('yargs')
    .option('b', {
        alias: 'base',
        type: 'number',
        describe: 'Base del numero a multiplicar',
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

module.exports = argv;