async function recuperarContexto(
    table,
    extractor,
    pregunta
) {

    const preguntaEmbedding = await extractor(
        pregunta,
        {
            pooling: "mean",
            normalize: true
        }
    );

    const resultado = await table.search(
        Array.from(preguntaEmbedding.data)
    ).limit(2).toArray();

   console.log(
    "\nTOP CHUNKS RECUPERADOS:\n"
);

resultado.forEach((r, i) => {

    console.log(
        `Chunk ${i + 1}`
    );

    console.log(r.texto);

    console.log("\n-----------------\n");
});

return resultado
    .map(r => r.texto)
    .join(" ");
}

module.exports = {
    recuperarContexto
};