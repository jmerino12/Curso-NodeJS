/*setTimeout(() => {
    console.log("Hola mundo")
}, 1000);*/

const getUserById = (id, callback) => {
    const usuario = {
        id,
        nombre: "Jonathan"
    }

    setTimeout(() => {
        callback(usuario)
    }, 1500)
}

getUserById(10, (usuario) => {
    console.log(usuario.id)
    console.log(usuario.nombre.toUpperCase())
});