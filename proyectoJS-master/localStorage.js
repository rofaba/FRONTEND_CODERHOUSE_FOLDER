//DESAFIO LOCAL STORAGE
//guarda high score
function guardarRecord(record, valor) {
    localStorage.setItem(record, valor);
}

//lee high score
function leerVidas(vidas) {
    let vidasGuardadas = localStorage.getItem(vidas);
    return parseInt(record)
}

//limpia LocalStorage
function limpiarStorage() {
    localStorage.clear();
}