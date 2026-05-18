const fs = require("fs");
const pdf = require("pdf-parse");
const lancedb = require("@lancedb/lancedb");
const { Ollama } = require("ollama");

const {
    limpiarTexto
} = require("./src/limpieza");

const {
    chunkSemantico
} = require("./src/chunking");

const {
    generarEmbeddings
} = require("./src/embeddings");

const {
    recuperarContexto
} = require("./src/retrieval");

const {
    evaluarRespuesta
} = require("./src/metrics");
const {
    leerDocumentos
} = require("./src/ingestion");

const ollama = new Ollama();

async function main() {

const texto = await leerDocumentos();

console.log(
    "Todos los PDFs fueron leídos"
);

    console.log("Texto limpiado");

    const chunks = chunkSemantico(texto);

    console.log("Chunks creados:", chunks.length);

    const {
        embeddings,
        extractor
    } = await generarEmbeddings(chunks);

    console.log("Embeddings generados");

    const db = await lancedb.connect("./lancedb");

    const dataToInsert = [];

    for (let i = 0; i < chunks.length; i++) {

        dataToInsert.push({
            id: i,
            texto: chunks[i],
            vector: embeddings[i]
        });
    }

    let table;

    try {

        table = await db.openTable(
            "documentos"
        );

        console.log(
            "Tabla existente cargada"
        );

    } catch {

        table = await db.createTable(
            "documentos",
            dataToInsert
        );

        console.log(
            "Nueva tabla creada"
        );
    }

    await table.add(dataToInsert);

    console.log(
        "Datos guardados en LanceDB"
    );

    const preguntas = JSON.parse(
        fs.readFileSync(
            "./evaluacion/preguntas.json",
            "utf8"
        )
    );

    const resultados = [];

    for (const item of preguntas) {

        console.log(
            "\nPregunta:",
            item.pregunta
        );

        const contexto =
            await recuperarContexto(
                table,
                extractor,
                item.pregunta
            );

        console.log(
            "\nContexto encontrado:"
        );

        console.log(contexto);

        const prompt = `
        Eres un sistema RAG.

        REGLAS:
        - SOLO usa el contexto.
        - NO inventes información.
        - Si no existe respuesta:
          responde:
          "No encontré información."

        CONTEXTO:
        ${contexto}

        PREGUNTA:
        ${item.pregunta}
        `;

        const response =
            await ollama.chat({
                model: "phi3",
                keep_alive: "10m",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            });

        const respuesta =
            response.message.content;

        console.log(
            "\nRESPUESTA:"
        );

        console.log(respuesta);

        const metricas =
            evaluarRespuesta(
                respuesta,
                item.respuesta_correcta
            );

        console.log(
            "\nMÉTRICAS:"
        );

        console.log(metricas);

        resultados.push({
            pregunta: item.pregunta,
            respuesta,
            metricas
        });
    }
const promedio = {

    precision: 0,
    recall: 0,
    faithfulness: 0,
    relevancia: 0
};

for (const r of resultados) {

    promedio.precision +=
        r.metricas.precision;

    promedio.recall +=
        r.metricas.recall;

    promedio.faithfulness +=
        r.metricas.faithfulness;

    promedio.relevancia +=
        r.metricas.relevancia;
}

promedio.precision /= resultados.length;

promedio.recall /= resultados.length;

promedio.faithfulness /= resultados.length;

promedio.relevancia /= resultados.length;

console.log(
    "\n===== MÉTRICAS PROMEDIO ====="
);

console.log(promedio);

fs.writeFileSync(
    "./evaluacion/estadisticas.json",
    JSON.stringify(
        promedio,
        null,
        2
    )
);
    fs.writeFileSync(
        "./evaluacion/resultados.json",
        JSON.stringify(
            resultados,
            null,
            2
        )
    );

    console.log(
        "\nResultados guardados"
    );
}

main();