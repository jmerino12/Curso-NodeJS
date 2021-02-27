const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        });
        return listado;
    }
    constructor() {
        this._listado = {};
    }

    cargarTareaFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = "") {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log("")
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { descripcion, completadoEn } = tarea;
            const estado = (completadoEn) ? "Completada".green : "Pendiente".red;
            console.log(`${idx} ${descripcion} :: ${estado}`)

        });
    }

    listarTareasPendientesCompletadas(completadas = true) {
        console.log("")
        let contador = 0
        this.listadoArr.forEach((tarea) => {
            const { descripcion, completadoEn } = tarea;
            const estado = (completadoEn) ? "Completada".green : "Pendiente".red;
            if (completadas == true) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green}. ${descripcion} :: ${completadoEn.toString()}`)
                }
            } else if (!completadoEn) {
                contador += 1;
                console.log(`${contador.toString().green}. ${descripcion} :: ${completadoEn}`)

            }

        });
    }


}
module.exports = Tareas;