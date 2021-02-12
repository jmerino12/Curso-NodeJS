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


const getEmpleado = (id, callback) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre;
    if (empleado) {
        return callback(null, empleado);
    } else {
        return callback(`Empleado con ${id} no existe.`)
    }
}

const getSalario = (id, callback) => {
    const empleado = salario.find((e) => e.id === id)?.salario;
    if (empleado) {
        return callback(null, empleado);
    } else {
        return callback(`No existe salario para el empleado con id ${id}`)
    }
}
const id = 3;
getEmpleado(id, (err, empleado) => {
    if (err) {
        console.log("ERROR!");
        return console.log(err);
    }
    getSalario(id, (err, salario) => {
        if (err) {
            console.log("ERROR!");
            return console.log(err);
        }
        console.log(`El empleado ${empleado} tiene un salario de ${salario}`)
    })
});

