//PERSONAJES LOCAL STORAGE JSON

class Personaje {
    constructor(nombre, edad, ocupacion, personalidad) {
        this.nombre = nombre;
        this.edad = edad;
        this.ocupacion = ocupacion;
        this.personalidad = personalidad;
    }
}
const perso1 = new Personaje("Homero", "39 años", "Técnico Nuclear", "Un poco torpe pero divertido");
const perso2 = new Personaje("Bart", "10 años", "Estudiante", "Astuto y travieso, siempre ganador");
const perso3 = new Personaje("Lisa", "8 años", "Estudiante", "Muy responsable, niña genio");

const poolPersonajes = [perso1, perso2, perso3];

const perso1Guardado = JSON.stringify(perso1);
const perso2Guardado = JSON.stringify(perso2);
const perso3Guardado = JSON.stringify(perso3);


//Seleccion de personaje

let tarjeta1 = document.getElementById("probandoHomero");
let tarjeta2 = document.getElementById("probandoBart");
let tarjeta3 = document.getElementById("probandoLisa");

function resaltarHomero() {
    tarjeta1.style.backgroundColor = "#ffd90f";

};
function normalizarHomero() {
    tarjeta1.style.backgroundColor = 'rgb(235, 229, 229)';
}

function resaltarBart() {
    tarjeta2.style.backgroundColor = "#ffd90f";

};
function normalizarBart() {
    tarjeta2.style.backgroundColor = 'rgb(235, 229, 229)';
}

function resaltarLisa() {
    tarjeta3.style.backgroundColor = "#ffd90f";

};
function normalizarLisa() {
    tarjeta3.style.backgroundColor = 'rgb(235, 229, 229)';
}

let fotoSelect = document.getElementById("seleccion");
let nombreNuevo = document.getElementById('nombreSeleccionado');
let nuevoTexto = document.getElementById('textoSeleccionado');

function seleccionarHomero() {
    fotoSelect.src = "imagenes/personajeHomero.jpeg";
    nombreNuevo.innerHTML = 'Homero Simpson';
    nuevoTexto.innerHTML = 'Click en Jugar para empezar';
    localStorage.setItem("personaje", 'Homero Simpson');
    localStorage.setItem('personajeDatos', perso1Guardado);
}
function seleccionarBart() {
    fotoSelect.src = "imagenes/personajeBart.jpg";
    nombreNuevo.innerHTML = 'Bart Simpson';
    nuevoTexto.innerHTML = 'Click en Jugar para empezar';
    localStorage.setItem("personaje", 'Bart Simpson');
    localStorage.setItem('personajeDatos', perso2Guardado);
}
function seleccionarLisa() {
    fotoSelect.src = "imagenes/personajeLisa.jpeg";
    nombreNuevo.innerHTML = 'Lisa Simpson';
    nuevoTexto.innerHTML = 'Click en Jugar para empezar';
    localStorage.setItem("personaje", 'Lisa Simpson');
    localStorage.setItem('personajeDatos', perso3Guardado);
}
tarjeta1.addEventListener("click", seleccionarHomero);
tarjeta2.addEventListener("click", seleccionarBart);
tarjeta3.addEventListener("click", seleccionarLisa);

tarjeta1.addEventListener("mouseover", resaltarHomero);
tarjeta1.addEventListener("mouseleave", normalizarHomero);
tarjeta2.addEventListener("mouseover", resaltarBart);
tarjeta2.addEventListener("mouseleave", normalizarBart);
tarjeta3.addEventListener("mouseover", resaltarLisa);
tarjeta3.addEventListener("mouseleave", normalizarLisa);

