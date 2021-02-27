const inquirer = require('inquirer');
require('colors')

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${"1.".green} Buscar Ciudad`,
            },
            {
                value: 2,
                name: `${"2.".green} Historial`,
            },
            {
                value: 0,
                name: `${"0.".green} Salir`,
            },
        ]
    }
]

const inquirerMenu = async () => {
    //console.clear()
    console.log('======================'.green)
    console.log('Seleccione una opcion:'.gray)
    console.log('======================'.green)

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar.`
        }
    ]
    console.log("\n")
    await inquirer.prompt(question);
}

const leerinput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length == 0) {
                    return "Por favor ingrese un valor";
                }
                return true;
            }
        }
    ]
    const { desc } = await inquirer.prompt(question);
    return desc;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerinput
}