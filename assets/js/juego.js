
/*
 

*/

let   deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias del HTML

const btnPedir = document.querySelector('#btnPedir');
const btnDeneter = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');




//Función de creación
const crearDeck = () =>{
    for(let i = 2; i<=10; i++){
        // deck.push(i+'C');
        for(let tipo of tipos){
            deck.push(i+tipo);
        }
    }
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp+tipo);
        }
    }


    // console.log(deck);
    deck = _.shuffle(deck); //suffle es para desordenar los elementos
    console.log(deck);
    return deck;

}


crearDeck();

//Esta función nos permite tomar una carta:
const pedirCarta = () =>{

    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop(); 

 
    return carta;
}


// pedirCarta();


const valorCarta = (carta) =>{
    const valor = carta.substring(0, carta.length - 1);
    
    return (isNaN( valor )) ? 
            (valor === 'A') ? 11:10
            : valor * 1;
}

//Turno de la computadora:
const turnoComputadora = (puntosMinimos) =>{

    do{
        const carta = pedirCarta();
    
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if(puntosMinimos > 21){
            break;
        }

    }while((puntosComputadora < puntosMinimos) && (puntosMinimos <=21));

    setTimeout(() => {

    if( puntosComputadora === puntosMinimos){
        alert('Nadie gana');
    } else if ( puntosMinimos >21 ){
        alert('Computadora gana');
    } else if(puntosComputadora >21){
        alert('Jugador ganó');
    } else{
        alert('Computadora gana');
    }
    },10);

}


const valor = valorCarta(pedirCarta());

//Eventos
btnPedir.addEventListener('click', () =>{

    const carta = pedirCarta();
    
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if ( puntosJugador > 21){
        console.warn('Has perdido');
        btnPedir.disabled = true;
        btnDeneter.disabled = true;
        turnoComputadora( puntosJugador );
    } else if(puntosJugador === 21){
        console.warn('21, genial!');
        btnPedir.disabled = true;
        btnDeneter.disabled = true;
        turnoComputadora( puntosJugador );
    }

});

btnDeneter.addEventListener('click', ()=>{
    btnPedir.disabled = true;
    btnNuevo.disabled = true;
    turnoComputadora(puntosJugador);
});


btnNuevo.addEventListener('click',() =>{
    console.clear();

    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDeneter.disabled = false;

});

