
const txtEscritorio = document.querySelector('#txtEscritorio');
const btnAtender = document.querySelector('#btnAtender');
const numTicket = document.querySelector('#numTicket');
const noHayMas = document.querySelector('#noHayMas');
const lblPendientes = document.querySelector('#lblPendientes');
const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');

}

const escritorio = searchParams.get('escritorio');
txtEscritorio.innerText = escritorio;
noHayMas.style.display = 'none'
const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disable = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disable = true;

});

socket.on('tickets-pendientes', (pendientes) => {
    if (pendientes === 0) {
        lblPendientes.style.display = 'none';

    } else {
        lblPendientes.style.display = '';
        lblPendientes.innerText = pendientes;

    }

});

btnAtender.addEventListener('click', () => {
    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {
        if (!ok) {
            numTicket.innerText = `NADIE`

            return noHayMas.style.display = '';
        } else {
            numTicket.innerText = `Tikect ${ticket.numero}`
        }
    });

});