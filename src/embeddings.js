const { pipeline } = require("@xenova/transformers");

async function generarEmbeddings(chunks) {

    const extractor = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2"
    );

    const embeddings = [];

    for (const chunk of chunks) {

        const output = await extractor(chunk, {
            pooling: "mean",
            normalize: true
        });

        embeddings.push(Array.from(output.data));
    }

    return {
        embeddings,
        extractor
    };
}

module.exports = {
    generarEmbeddings
};