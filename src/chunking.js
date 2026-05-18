function chunkSemantico(texto, tamaño = 300, overlap = 50) {

    const oraciones = texto.split(". ");

    const chunks = [];

    let actual = "";

    for (const oracion of oraciones) {

        if ((actual + oracion).length > tamaño) {

            chunks.push(actual);

            actual = actual.slice(-overlap);
        }

        actual += oracion + ". ";
    }

    if (actual.length > 0) {

        chunks.push(actual);
    }

    return chunks;
}

module.exports = {
    chunkSemantico
};