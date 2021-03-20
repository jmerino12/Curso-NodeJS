
const txtEscritorio = document.querySelector('#txtEscritorio');
const btnAtender = document.querySelector('#btnAtender');
const numTicket = document.querySelector('#numTicket');
const noHayMas = document.querySelector('#noHayMas');

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

socket.on('ultimo-ticket', (ultimo) => {
    //lblNuevoTicket.innerText = 'Ticket ' + ultimo;

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