require('colors')
const { inquirerMenu, pausa, leerinput } = require('./helpers/inquirer')
const Tarea = require('./models/tarea')
const Tareas = require('./models/tareas')


console.clear()

const main = async () => {
    console.log('Hola mundo')
    let opt = ""
    const tareas = new Tareas();
    do {

        opt = await inquirerMenu();
        switch (opt) {
            case "1":
                const desc = await leerinput(`Descripción: `);
                tareas.crearTarea(desc);
                break;
            case "2":
                console.log(tareas._listado)
                break;
            case "3":
                break;
            case "4":
                break;
            case "5":
                break;
            case "6":
                break;
        }
        await pausa()
    } while (opt !== "0");
    //pausa();
}


main();