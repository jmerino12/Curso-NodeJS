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
const id = 5
/*getEmpleado(id)
    .then(empleado => console.log(empleado))
    .catch(err => console.log(err));
getSalario(id)
    .then(salario => console.log(salario))
    .catch(err => console.log(err));*/
/*getEmpleado(id)
    .then(empleado => {
        getSalario(id).then(salario => {
            console.log("El empleado " + empleado + " con salario es " + salario)
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));*/
let nombre = "";
getEmpleado(3)
    .then(empleado => {
        nombre = empleado;
        return getSalario(id)
    })
    .then(salario => {
        console.log("El empleado:", nombre,
            "tiene un salario de:", salario)
    }).catch(err => console.log(err))