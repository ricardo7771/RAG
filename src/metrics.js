function evaluarRespuesta(
    respuesta,
    respuestaCorrecta
) {

    const normalizada = respuesta.toLowerCase();

    const correcta = respuestaCorrecta.toLowerCase();

    const precision =
        normalizada.includes(correcta) ? 1 : 0;

    const recall = precision;

    const faithfulness = precision;

    const relevancia = precision;

    return {
        precision,
        recall,
        faithfulness,
        relevancia
    };
}

module.exports = {
    evaluarRespuesta
};