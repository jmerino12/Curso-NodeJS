const empleados = [
    {
        id: 1,
        nombre: "Fernando",
    }, {
        id: 2,
        nombre: "Valentina",
    }, {
        id: 3,
        nombre: "Jonathan",
    }

];

const salario = [
    {
        id: 1,
        salario: 2200,
    }, {
        id: 2,
        salario: 1500,
    },

];

const getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        const empleado = empleados.find((e) => e.id === id)?.nombre;
        (empleado) ? resolve(empleado) : reject(`No existe empleado con id ${id}`)

    });
}

const getSalario = (id) => {
    return new Promise((resolve, reject) => {
        const salarios = salario.find((e) => e.id === id)?.salario;
        (salarios) ? resolve(salarios) : reject(`No salario para el empleado con id ${id}`)

    });
}
const id = 4;
const getInfoUsuario = async (id) => {
    try {
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);

        return `El salario del empleado ${empleado} es de ${salario}`;
    } catch (error) {
        throw error;
    }

}
getInfoUsuario(id).then(msg => console.log(msg)).catch(err => console.log(err));



