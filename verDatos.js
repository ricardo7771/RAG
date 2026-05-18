const lancedb = require("@lancedb/lancedb");

async function verDatos() {

    // Conectar a la base
    const db = await lancedb.connect("./lancedb");

    // Abrir tabla
    const table = await db.openTable("documentos");

    // Obtener registros
    const registros = await table.query().toArray();

    console.log("\n===== DATOS GUARDADOS EN LANCEDB =====\n");

    registros.forEach((registro, index) => {

        console.log(`REGISTRO #${index + 1}\n`);

        console.log("ID:");
        console.log(registro.id);

        console.log("\nTEXTO:");
        console.log(registro.texto);

        console.log("\nVECTOR (primeros 10 valores):");
        console.log(registro.vector.slice(0, 10));

        console.log("\n=====================================\n");
    });
}

verDatos();