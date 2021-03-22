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

    socket.on('recibir-mensajes', (payload) => {
        console.log(payload);
    });

    socket.on('usuarios-activos', (payload) => {
        dibujarUsuario(payload)
    });

    socket.on('mensaje-privado', () => {

    });


}

const dibujarUsuario = (usuarios = []) => {
    let userHtml = '';
    usuarios.forEach(({ nombre, uid }) => {
        userHtml += `
        <li>
        <p>
        <h5 class="text-success">${nombre}</h5>
        <span class="fs-6 text-muted">${uid}</span>
        </p>
        </li>
        `;
    });
    ulUsuarios.innerHTML = userHtml;
}

txtMensaje.addEventListener('keyup', ({ keyCode }) => {
    const mensaje = txtMensaje.value;
    const uid = txtUid.value;

    if (keyCode !== 13) {
        return;
    }
    if (mensaje.length === 0) {
        return;
    }

    socket.emit('enviar-mensaje', { mensaje, uid });
    txtMensaje.value = '';
})

const main = async () => {
    const token = await validarJTW();

}


main();