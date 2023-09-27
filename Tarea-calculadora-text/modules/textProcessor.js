
function dividirPalabras(texto) {
    return texto.split(" ");
}

function eliminarEspacios(texto) {
    return texto.replace(/\s+/g, "");
}

function capitalizarTexto(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function textoEnMinusculas(texto) {
    return texto.toLowerCase();
}

function textoEnMayusculas(texto) {
    return texto.toUpperCase();
}

function contarCaracteres(texto) {
    return texto.length;
}

module.exports = {
    dividirPalabras,
    eliminarEspacios,
    capitalizarTexto,
    textoEnMinusculas,
    textoEnMayusculas,
    contarCaracteres,
};
