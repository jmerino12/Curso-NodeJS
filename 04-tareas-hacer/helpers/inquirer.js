const inquirer = require('inquirer');
require('colors')

const preguntas = [
    {
        type: 'list',
        name: 'Opción',
        message: '¿Qué desea hacer?',
        choices: ['opt1', 'opt2', 'opt3']
    }
]

const inquirerMenu = async () => {
    console.clear()
    console.log('======================'.green)
    console.log('Seleccione una opcion:'.green)
    console.log('======================'.green)

    const opt = await inquirer.prompt(preguntas);
    return opt;
}

module.exports = {
    inquirerMenu
}