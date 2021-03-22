const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth'
    : 'https://restserver-curso-fher.herokuapp.com/api/auth/';
//REFERENCIAS HTML
const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');



let usuario = null;
let socket = null;
const validarJTW = async () => {
    const token = localStorage.getItem('token') || '';
    console.log(token)
    if (token <= 10) {
        window.location = 'index.html'
        throw new Error('no hay token en el servidor')
    }

    const resp = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-token': token }
    });


    const { usuario: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem('token', tokenDB);
    console.log(userDB)
    usuario = userDB;
    document.title = usuario.nombre

    await conectarSocket();
}

const conectarSocket = async () => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token'),
        }
    });

    socket.on('connect', () => { console.log('Sockets online') });
    socket.on('disconnect', () => { console.log('Sockets offline') });

    socket.on('recibir-mensajes', () => {

    });

    socket.on('usuarios-activos', () => {

    });

    socket.on('mensaje-privado', () => {

    });


}

const main = async () => {
    const token = await validarJTW();

}


main();