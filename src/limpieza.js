function limpiarTexto(texto) {

    return texto
        .replace(/\n/g, " ")
        .replace(/\r/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

module.exports = {
    limpiarTexto
};