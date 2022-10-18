//PREPARACION DEL JUEGO
/* Cree [poolPalabras] como Array base del juego, con la función (indexRandom) obtengo un número entero al azar y con ese número selecciono la palabras para jugar desde el array base */

let caracter;
let personaje;
let datosPersonaje;
let recuperarPersonaje;
let contadorAciertos = [];

//este personaje se recupera desde el Local Storage, fue almacenado al alegir uno de los tres disponibles.
let persoFondo = document.getElementById('personajeSeleccionado');
persoFondo.innerHTML = localStorage.getItem("personaje") || "Homero Simpsons"; //asigna Homero si no se selecciona alguno. 

//seleccion de background image de acuerdo a personaje selecionado

switch (localStorage.getItem("personaje")) {

    case 'Homero Simpson':
        document.body.style.backgroundImage = "url('./imagenes/fondoHomero-modified.jpg')";
        document.getElementById('jugando').src = './imagenes/homeroInicial.webp';

        break;

    case 'Bart Simpson':
        document.body.style.backgroundImage = "url('./imagenes/fondoBart-modified.webp')";
        document.getElementById('jugando').src = './imagenes/bartInicial.png';
        break;

    case 'Lisa Simpson':
        document.body.style.backgroundImage = "url('./imagenes/fondoLisa-modified.jpeg')";
        document.getElementById('jugando').src = './imagenes/lisaInicial.png';
        break;

    default:
        document.body.style.backgroundImage = "url('./imagenes/fondoHomero.jpg')";
        document.getElementById('jugando').src = './imagenes/homeroInicial.webp'; //Homero por defecto
}

// Quote se obtiene desde una API y se muestra una diferente en cada nuevo juego

quote = document.getElementById('quotes');

fetch("https://los-simpsons-quotes.herokuapp.com/v1/quotes")
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        quote.innerHTML = `${data[0].quote}  -  ${data[0].author}`;
    })

    //tenemos un pool de palabras
const poolPalabras = [  'murcielago', 'homero', 'calendario', 'libreria', 'teclado',
                        'piscina', 'imperdible', 'tecnologia', 'favorito', 'television',
                        'periodico', 'coderhouse', 'javascript', 'videojuego', 'tiburon',
                        'almacen','bitcoin','escuela', 'facturas', 'huracan', 'bicicleta'];

function indexRandom(minimo, maximo) { //fx reutilizable para numero al azar
    var numerosPosibles = maximo - minimo;
    var random = Math.random() * (numerosPosibles + 1);
    random = Math.floor(random); // transformación a nº entero
    return minimo + random;
}

let numeroAleatorio = indexRandom(0, 20);
let palabraSeleccionada = poolPalabras[numeroAleatorio];
const letrasArray = [...palabraSeleccionada]; //transforma el string en array

let completandoPalabra = [];
for (let i = 0; i < letrasArray.length; i++) {
    completandoPalabra.push(' _ ');
}
document.getElementById('palabraAdivina').innerHTML = completandoPalabra.join(''); //la mostramos sin comas

//EMPEZANDO JUEGO
let letraTrampa = document.getElementById('letraPP'); //ofrece ver la solucion

letraTrampa.addEventListener('mouseover', () => {
    document.getElementById('mensajeUsuario').innerHTML = " ¿ QUIERES VER LA SOLUCION ?";
    document.getElementById('segundoMensaje').innerHTML = "CLICK EN BOTON INTERROGACION";
    document.getElementById('mensajeUsuario').style.color = "red";

})

letraTrampa.addEventListener('mouseleave', () => {
    document.getElementById('mensajeUsuario').innerHTML = "Ingresa una letra para comenzar";
    document.getElementById('segundoMensaje').innerHTML = "Mucha suerte!";
    document.getElementById('mensajeUsuario').style.color = "black";
})

letraTrampa.addEventListener('click', () => {        //uso librería sweetalert
    let palabraEnMayusculas = palabraSeleccionada.toUpperCase();
    Swal.fire({
        title: `${palabraEnMayusculas}`,
        text: `Es la palabra secreta`,
        icon: 'info',
        confirmButtonText: 'Volver'
    })
})

const jugar = document.getElementById('botonInicio');
jugar.addEventListener('click', jugando); //inicia el juego
let vidasRestantes = 10;
let puntaje = 0;
letrasFallidas = [];

let letraIngresada = document.getElementById('pantalla');

function jugando() {

    letraIngresada = document.getElementById('pantalla');
    let i = 0;
    let laLetraNoEsta = true; //para ciclo cuenta de vidas
    let falla;

    //Acá se inhalbilita la letra para ser elegida nuevamente
    let letraGrande = (letraIngresada.value).toUpperCase();
    let teclaPulsada = document.getElementById(`letra${letraGrande}`);
    teclaPulsada.style.backgroundColor = 'grey';
    teclaPulsada.removeAttribute('onclick');
    teclaPulsada.classList.remove('borde');

    //verifica si la letra existe en palabra

    for (let i = 0; i < letrasArray.length; i++) {

        if (letrasArray[i] == letraIngresada.value) {
            completandoPalabra[i] = letraIngresada.value;
            contadorAciertos.push(letraIngresada.value);

            laLetraNoEsta = false;
            let contador = contadorAciertos.length;

            //mensajes avance juego
            document.getElementById('palabraAdivina').innerHTML = completandoPalabra.join('');
            document.getElementById('mensajeUsuario').innerHTML = "Muy bien, la tenemos"
            document.getElementById('segundoMensaje').innerHTML = "Ingresa otra letra"

            if (contador > 2) {
                document.getElementById('palabraAdivina').innerHTML = completandoPalabra.join('');
                document.getElementById('mensajeUsuario').innerHTML = "Excelente, sigue así!"
                document.getElementById('segundoMensaje').innerHTML = "Vamos por las otras letras"

            }

            if (contador > 4) {
                document.getElementById('palabraAdivina').innerHTML = completandoPalabra.join('');
                document.getElementById('mensajeUsuario').innerHTML = "Ya la tienes, eres muy bueno!"
                document.getElementById('segundoMensaje').innerHTML = "Quedan menos, vamos por otra"

            }

            if ((completandoPalabra.includes(' _ ')) != true) {
                ganaste();
            }
        }
    }
    if (laLetraNoEsta) {

        vidasRestantes--;

        document.getElementById('numeroVidas').innerHTML = vidasRestantes;
        document.getElementById('mensajeUsuario').innerHTML = "Esa letra no está en tu palabra"
        document.getElementById('segundoMensaje').innerHTML = "La próxima será mejor, vamos!"

        //mensajes si es que vamos perdiendo

        if (vidasRestantes == 5) {
            document.getElementById('numeroVidas').innerHTML = vidasRestantes;
            document.getElementById('mensajeUsuario').innerHTML = "Tampoco está, elige con cuidado"
            document.getElementById('segundoMensaje').innerHTML = "Vamos por otro intento."
        }
        if (vidasRestantes == 3) {
            document.getElementById('numeroVidas').innerHTML = vidasRestantes;
            document.getElementById('mensajeUsuario').innerHTML = "Ouch, todavía puedes"
            document.getElementById('segundoMensaje').innerHTML = "Elige otra letra!"
        }
        if (vidasRestantes == 1) {
            document.getElementById('numeroVidas').innerHTML = vidasRestantes;
            document.getElementById('mensajeUsuario').innerHTML = "Nop, no estaba... te queda una opción."
            document.getElementById('segundoMensaje').innerHTML = "No está muerto quién pelea!"
        }
    }
    //sitemna de imagenes dinámicas 
    vidasRestantes == 5 && imagenSegunda();
    vidasRestantes == 3 && imagenMediaVida();
    vidasRestantes == 1 && imagenFinal();
    vidasRestantes == 0 && perdiste();
}

function perdiste() {
    falla = document.getElementById("jugando");
    falla.classList.add("shake-horizontal");
    let mensajeFinal = document.getElementById('pantalla');
    let mensajeFinalDos = document.getElementById('botonInicio');
    let mensajeInferior = document.getElementById('mensajeUsuario');
    let mensajeInferiorDos = document.getElementById('segundoMensaje')
    let teclado = document.getElementById('container');
    imagenPerdiste();
    document.querySelector('#botonInicio').style.display = ('none');
    mensajeInferior.classList.add("scale-in-center");
    mensajeInferior.innerHTML = " PERDISTE ☹  ";
    mensajeInferior.style.fontFamily = 'hurricane', 'cursive';
    mensajeInferior.style.color = 'blue';
    mensajeInferior.style.fontSize = '6rem';
    mensajeFinalDos.style.display = "none";
    mensajeInferiorDos.style.display = 'none';
    let mostrarPalabraFinal = palabraSeleccionada.toUpperCase();
    document.getElementById('palabraAdivina').innerHTML = `${mostrarPalabraFinal}`;
    let apagaLetra = document.getElementById('letraPP');
    apagaLetra.style.display = "none";
}

function ganaste() {
    let mensajeFinal = document.getElementById('pantalla');
    let mensajeFinalDos = document.getElementById('botonInicio');
    let mensajeInferior = document.getElementById('mensajeUsuario');
    let mensajeInferiorDos = document.getElementById('segundoMensaje')
    let teclado = document.getElementById('container');
    imagenGanaste();
    document.querySelector('#botonInicio').style.display = ('none');
    mensajeInferior.classList.add("rotate-scale-up");
    mensajeInferior.innerHTML = " GANASTE  ツ ";
    mensajeInferior.style.fontFamily = 'hurricane', 'cursive';
    mensajeInferior.style.color = 'red';
    mensajeInferior.style.fontSize = '6rem';
    mensajeFinalDos.style.display = "none";
    mensajeInferiorDos.style.display = 'none';
    let apagaLetra = document.getElementById('letraPP');
    apagaLetra.style.display = "none";
}

function imagenPerdiste() { //depende del personaje elegido
    switch (localStorage.getItem("personaje")) {

        case 'Homero Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/angry_homer.jpeg';

            break;

        case 'Bart Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/bart_pierde.jpeg';
            break;

        case 'Lisa Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/lisa_looser.jpeg';
            break;

        default:
            falla = document.getElementById("jugando");
            falla.src = './imagenes/angry_homer.jpeg'; //Homero por defecto
    }


}

function imagenGanaste() {
    switch (localStorage.getItem("personaje")) {

        case 'Homero Simpson':
            falla = document.getElementById("jugando");
            falla.src = 'https://www.laguiadelvaron.com/wp-content/uploads/2019/01/simpson-gif-www.laguiadelvaron-2.gif';

            break;

        case 'Bart Simpson':
            falla = document.getElementById("jugando");
            falla.src = 'https://64.media.tumblr.com/a43e2ff78e09feef09bb718dc3501945/tumblr_nej8j2Gd701rvner1o1_500.gifv';
            break;

        case 'Lisa Simpson':
            falla = document.getElementById("jugando");
            falla.src = 'https://c.tenor.com/LRGXeXjJkcgAAAAC/im-so-excited-lisa-simpson.gif';
            break;

        default:
            falla = document.getElementById("jugando");
            falla.src = 'https://www.laguiadelvaron.com/wp-content/uploads/2019/01/simpson-gif-www.laguiadelvaron-2.gif';
    }


}

function imagenMediaVida() { //idem
    switch (localStorage.getItem("personaje")) {

        case 'Homero Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/homero_mediavida.gif';

            break;

        case 'Bart Simpson':
            falla = document.getElementById("jugando");
            falla.src = 'https://i.gifer.com/12rq.gif';
            break;

        case 'Lisa Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/lisa_mediavida.jpeg';
            break;

        default:
            falla = document.getElementById("jugando");
            falla.src = './imagenes/homero_mediavida.png'; //Homero por defecto
    }


}

function imagenSegunda() {
    switch (localStorage.getItem("personaje")) {

        case 'Homero Simpson':
            falla = document.getElementById("jugando");
            falla.src = 'https://i.gifer.com/8kqy.gif';

            break;

        case 'Bart Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/focusyn.webp';
            break;

        case 'Lisa Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/lisa_piensa.jpeg';
            break;

        default:
            falla = document.getElementById("jugando");
            falla.src = 'https://i.gifer.com/8kqy.gif'; //Homero por defecto
    }


}

function imagenFinal() {
    switch (localStorage.getItem("personaje")) {

        case 'Homero Simpson':
            falla = document.getElementById("jugando");
            falla.src = 'https://c.tenor.com/J8s7Y4Bu2qYAAAAC/the-end-is-near-homer.gif';

            break;

        case 'Bart Simpson':
            falla = document.getElementById("jugando");
            falla.src = 'https://i.gifer.com/Bpwv.gif';
            break;

        case 'Lisa Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/lisa_pierde.png';
            break;

        default:
            falla = document.getElementById("jugando");
            falla.src = 'https://c.tenor.com/J8s7Y4Bu2qYAAAAC/the-end-is-near-homer.gif'; //Homero por defecto
    }
}