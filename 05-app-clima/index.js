
require('dotenv').config()
const { leerinput, inquirerMenu } = require('./helpers/inquirer');
const Busquedas = require('./models/Busquedas');
//console.log(process.env.MAP_BOX)
const main = async () => {
    const busquedas = new Busquedas();
    let opt;
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const lugar = await leerinput('Ciudad ');
                busquedas.ciudad(lugar);
                break;
            case 2:
                break;
            case 0:
                break;
        }

    } while (opt !== 0);
}

main();