
require('dotenv').config()
const { leerinput, inquirerMenu, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/Busquedas');
//console.log(process.env.MAP_BOX)
const main = async () => {
    const busquedas = new Busquedas();
    let opt;
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const termino = await leerinput('Ciudad: ');
                const lugares = await busquedas.ciudad(termino);
                const idSeleccionado = await listarLugares(lugares)
                const lugarSeleccionado = lugares.find(l => l.id === idSeleccionado)


                const clima = await busquedas.climarLugar(lugarSeleccionado.lat, lugarSeleccionado.long)

                console.clear()
                //Informacion de la ciudad
                console.log('\n Infromacion de la ciudad\n'.green)
                console.log('Ciudad:', lugarSeleccionado.nombre)
                console.log('Lat:', lugarSeleccionado.lat)
                console.log('Long:', lugarSeleccionado.long)
                console.log('Temperatura:', clima.temp)
                console.log('Minima:', clima.min)
                console.log('Maxima:', clima.max)
                console.log('Descripcion:', clima.desc)
                break;
            case 2:
                break;
            case 0:
                break;
        }

    } while (opt !== 0);
}

main();