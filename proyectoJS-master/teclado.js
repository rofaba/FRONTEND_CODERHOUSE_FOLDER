function noRecargar(evento){
evento.preventDefault();
}
alert("probando reinicio");

let mostrar = document.getElementById("pantalla");
let jugar = document.getElementById('botonInicio');
jugar.addEventListener("click", ()=> {
    alert(mostrar.value);
});
