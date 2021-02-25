require('colors')
const { guardarDB, leerBD } = require('./helpers/guardarArchivo')
const { inquirerMenu, pausa, leerinput } = require('./helpers/inquirer')
const Tarea = require('./models/tarea')
const Tareas = require('./models/tareas')


console.clear()

const main = async () => {
    console.log('Hola mundo')
    let opt = ""
    const tareas = new Tareas();
    const tareasBD = leerBD();
    if (tareasBD) {
        tareas.cargarTareaFromArray(tareasBD);
    }
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case "1":
                const desc = await leerinput(`Descripción: `);
                tareas.crearTarea(desc);
                break;
            case "2":
                tareas.listadoCompleto()
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
        guardarDB(tareas.listadoArr);
        await pausa()
    } while (opt !== "0");
    //pausa();
}


main();