
const lblOnline = document.querySelector('#lblOnline');
const lbloffline = document.querySelector('#lbloffline');
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar');
const socketCliente = io();

socketCliente.on('connect', () => {
    //console.log('conectado');
    lbloffline.style.display = 'none';
    lblOnline.style.display = '';

});

socketCliente.on('disconnect', () => {
    //console.log('desconectado');
    lbloffline.style.display = '';
    lblOnline.style.display = 'none';
})

socketCliente.on('enviar-mensaje', (payload) => {
    console.log(payload)
})

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    socketCliente.emit('enviar-mensaje', payload, (id) => {
        console.log('desde el server', id)
    });
})