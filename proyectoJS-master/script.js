//JUGANDO

/* Cree [poolPalabras] como Array base del juego, con la función (indexRandom) obtengo un número entero al azar y con ese número selecciono la palabras para jugar desde el array base */
let caracter;
let personaje;
let datosPersonaje;
let recuperarPersonaje;

//adquiere desde Local Storage con y sin JSON el personaje seleccionado y sus caracteristicas para mostrarlas

let persoFondo = document.getElementById('personajeSeleccionado');
persoFondo.innerHTML = localStorage.getItem("personaje") || "Homero Simpsons"; 

// OPTIMIZACION: USO DE OPERADOR LOGICO OR

//asigna Homero si no se selecciona alguno. //eleccion background de acuerdo a personaje selecionado
switch (localStorage.getItem("personaje")) {

    case 'Homero Simpson':
        document.body.style.backgroundImage = "url('./imagenes/fondoHomero.jpg')";
        document.getElementById('jugando').src = './imagenes/homeroInicial.webp';
        break;

    case 'Bart Simpson':
        document.body.style.backgroundImage = "url('./imagenes/fondoBart.webp')";
        document.getElementById('jugando').src = './imagenes/bartInicial.png';
        break;

    case 'Lisa Simpson':
        document.body.style.backgroundImage = "url('./imagenes/fondoLisa.jpeg')";
        document.getElementById('jugando').src = './imagenes/lisaInicial.png';
        break;

    default:
        document.body.style.backgroundImage = "url('./imagenes/fondoHomero.jpg')";
        document.getElementById('jugando').src = './imagenes/homeroInicial.webp'; //Homero por defecto
}

let botonMostrar = document.getElementById('muestraPersonaje');
botonMostrar.addEventListener("click", mostrar)

function mostrar() {

    recuperarPersonaje = JSON.parse(localStorage.getItem("personajeDatos"));
    
    // OPTIMIZACION: USO DE DESESTRUCTURACION

    let {edad, ocupacion, personalidad} = recuperarPersonaje;

    document.getElementById('muestralo1').innerHTML = edad;
    document.getElementById('muestralo2').innerHTML = ocupacion;
    document.getElementById('muestralo3').innerHTML = personalidad;
}

let botonMostrar2 = document.getElementById('ocultaPersonaje');
botonMostrar2.addEventListener("click", ocultar)

function ocultar() {
    document.getElementById('muestralo1').innerHTML = " ";
    document.getElementById('muestralo2').innerHTML = " ";
    document.getElementById('muestralo3').innerHTML = " ";
}

const poolPalabras = ['primera', 'probando', 'palabras', 'para', 'juego', 'colgado', 'ultima'];

function indexRandom(minimo, maximo) { //fx reutilizable
    var numerosPosibles = maximo - minimo;
    var random = Math.random() * (numerosPosibles + 1);
    random = Math.floor(random); // transformación a nº entero
    return minimo + random;
}

let numeroAleatorio = indexRandom(0, 6);
let palabraSeleccionada = poolPalabras[numeroAleatorio];
const letrasArray = [...palabraSeleccionada]; //transforma el string en array

//OPTIMIZACION: USO OPERADOR SPREAD

let completandoPalabra = [];
for (let i = 0; i < letrasArray.length; i++) { 
    completandoPalabra.push(' _ ');
}

document.getElementById('palabraAdivina').innerHTML = completandoPalabra.join(''); //sacamos las comas

//EMPEZANDO JUEGO
const jugar = document.getElementById('botonInicio');
jugar.addEventListener('click', jugando); //lanza la función
let vidasRestantes = 7;
let puntaje = 0;

function jugando() {
    let letraIngresada = document.getElementById('letraUsuario');
    let letra = letraIngresada.value;
    let i = 0;
    let laLetraNoEsta = true; //para ciclo cuenta de vidas
    let record = [];

    //verifica si la letra existe en palabra

    for (let i = 0; i < letrasArray.length; i++) {
        if (letrasArray[i] == letraIngresada.value) {
            completandoPalabra[i] = letraIngresada.value;
            record.push(i);
            laLetraNoEsta = false;
            puntaje = puntaje + (record.length * 10);

            document.getElementById('puntajeActual').innerHTML = puntaje;
            document.getElementById('palabraAdivina').innerHTML = completandoPalabra.join('');
            document.getElementById('mensajeUsuario').innerHTML = "Muy bien, tenemos coincidencias"
            document.getElementById('segundoMensaje').innerHTML = "Ingresa la siguiente letra"

            if ((completandoPalabra.includes(' _ ')) != true) {
                ganaste();
                puntaje = puntaje + 50;
                document.getElementById('puntajeActual').innerHTML = puntaje;
            }
        }
    }
    if (laLetraNoEsta) {
        vidasRestantes--; //OPTIMIZACION: USO OPERADOR --
        document.getElementById('numeroVidas').innerHTML = vidasRestantes;
        document.getElementById('mensajeUsuario').innerHTML = "Esa letra no está en tu palabra"
        document.getElementById('segundoMensaje').innerHTML = "En la próxima tendrás mejor suerte, vamos!"
    }
    vidasRestantes == 0 && perdiste();  //OPTIMIZACION USO OPERADOR LOGICO AND

    
}

function perdiste() {
    let mensajeFinal = document.getElementById('ingresarDatos');
    let mensajeFinal2 = document.getElementById('probando');
    let mensajeInferior = document.getElementById('mensajeUsuario');
    mensajeInferior.innerHTML = " ";
    mensajeFinal.innerHTML = "PERDISTE!!!"
    mensajeFinal.style.fontSize = "5rem";
    mensajeFinal.style.color = "red";
    mensajeFinal2.style.fontSize = "2rem";
    mensajeFinal2.innerHTML = `Tu palabra era " ${palabraSeleccionada} " `;
    document.getElementById('segundoMensaje').
        innerHTML = "Juega otra vez!!!!"

}

function ganaste() {

    let mensajeFinal = document.getElementById('ingresarDatos');
    let mensajeFinal2 = document.getElementById('probando');
    let mensajeInferior = document.getElementById('mensajeUsuario');
    mensajeInferior.innerHTML = " ";
    mensajeFinal.innerHTML = "GANASTE!!!!"
    mensajeFinal.style.fontSize = "5rem";
    mensajeFinal.style.color = "green";
    mensajeFinal2.innerHTML = " ";
    document.getElementById('segundoMensaje').
        innerHTML = "Juega otra vez!!!!"
}