
// Referencias del HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnAgregar = document.querySelector('#btnAgregar');


const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnAgregar.disable = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAgregar.disable = true;

});

socket.on('ultimo-ticket', (ultimo) => {
    lblNuevoTicket.innerText = 'Ticket ' + ultimo;

});

btnAgregar.addEventListener('click', () => {

    socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket;
    });

});