const fs = require("fs");
const pdf = require("pdf-parse");

const {
    limpiarTexto
} = require("./limpieza");

async function leerDocumentos() {

    const archivos = fs.readdirSync(
        "./documentos"
    );

    let textoCompleto = "";

    for (const archivo of archivos) {

        if (archivo.endsWith(".pdf")) {

            console.log(
                `Leyendo PDF: ${archivo}`
            );

            const dataBuffer =
                fs.readFileSync(
                    `./documentos/${archivo}`
                );

            const data =
                await pdf(dataBuffer);

            const textoLimpio =
                limpiarTexto(data.text);

            textoCompleto +=
                textoLimpio + " ";
        }
    }

    return textoCompleto;
}

module.exports = {
    leerDocumentos
};