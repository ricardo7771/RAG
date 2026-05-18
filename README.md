

# Sistema RAG Local con Node.js

## Descripción del Proyecto

Este proyecto implementa un sistema RAG (Retrieval-Augmented Generation) completamente local utilizando Node.js, LanceDB, Ollama y Transformers.js.

El sistema:

* Lee múltiples documentos PDF
* Limpia y procesa texto
* Divide documentos mediante chunking semántico
* Genera embeddings locales
* Almacena vectores en una base de datos vectorial
* Recupera contexto relevante usando búsqueda semántica
* Genera respuestas con un modelo LLM local
* Evalúa métricas RAG
* Reduce alucinaciones mediante prompting restrictivo

---

# Arquitectura del Sistema

```text
PDFs
   ↓
Limpieza de texto
   ↓
Chunking semántico
   ↓
Embeddings
   ↓
LanceDB
   ↓
Retrieval semántico
   ↓
Ollama + Phi3
   ↓
Respuesta final
```

---

# Tecnologías Utilizadas

* Node.js
* LanceDB
* Ollama
* Phi3
* Transformers.js
* pdf-parse

---

# Requisitos

## Instalar Node.js

Descargar:

[https://nodejs.org/](https://nodejs.org/)

Versión recomendada:

```text
Node.js 20+
```

---

# Instalación de Ollama

Descargar:

[https://ollama.com/](https://ollama.com/)

Verificar instalación:

```bash
ollama --version
```

---

# Descargar Modelo IA

Instalar Phi3:

```bash
ollama run phi3
```

Esperar la descarga completa.

Salir con:

```bash
/bye
```

---

# Instalación del Proyecto

## 1. Clonar repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

## 2. Entrar a carpeta

```bash
cd Rag-Proyecto
```

## 3. Instalar dependencias

```bash
npm install
```

---

# Dependencias Utilizadas

## Instalar manualmente

```bash
npm install pdf-parse@1.1.1
npm install @xenova/transformers
npm install @lancedb/lancedb
npm install ollama
```

---

# Estructura del Proyecto

```text
Rag-Proyecto
│
├── documentos/
│   ├── manual1.pdf
│   ├── manual2.pdf
│   └── manual3.pdf
│
├── evaluacion/
│   ├── preguntas.json
│   ├── resultados.json
│   └── estadisticas.json
│
├── lancedb/
│
├── src/
│   ├── limpieza.js
│   ├── chunking.js
│   ├── embeddings.js
│   ├── retrieval.js
│   ├── ingestion.js
│   └── metrics.js
│
├── app.js
├── verDatos.js
├── arquitectura.md
├── README.md
└── package.json
```

---

# Funcionalidades Implementadas

## 1. Ingesta Multi PDF

El sistema puede leer automáticamente múltiples archivos PDF desde la carpeta:

```text
documentos/
```

---

## 2. Limpieza de Texto

El sistema elimina:

* saltos de línea
* espacios innecesarios
* caracteres redundantes

---

## 3. Chunking Semántico

Los documentos se fragmentan usando:

* chunking por oraciones
* overlap
* preservación de contexto

---

## 4. Embeddings

Se generan embeddings usando:

```text
Xenova/all-MiniLM-L6-v2
```

---

## 5. Base de Datos Vectorial

Se utiliza:

```text
LanceDB
```

para almacenar:

* chunks
* embeddings
* índices vectoriales

---

## 6. Retrieval Semántico

El sistema recupera los fragmentos más relevantes usando similitud semántica.

---

## 7. Generación con LLM Local

El modelo:

```text
Phi3
```

responde utilizando únicamente el contexto recuperado.

---

## 8. Contención de Alucinaciones

El prompt restringe al modelo para:

* NO inventar información
* responder únicamente usando contexto
* admitir desconocimiento

Respuesta esperada:

```text
No encontré información.
```

---

# Evaluación del Sistema RAG

El sistema implementa métricas:

* Precision
* Recall
* Faithfulness
* Relevancia

Los resultados se almacenan en:

```text
evaluacion/resultados.json
```

---

# Estadísticas Promedio

Las métricas promedio se almacenan en:

```text
evaluacion/estadisticas.json
```

---

# Cómo Ejecutar el Proyecto

## Ejecutar sistema RAG

```bash
node app.js
```

---

## Ver datos almacenados en LanceDB

```bash
node verDatos.js
```

---

# Cómo Agregar Nuevos PDFs

Copiar archivos PDF dentro de:

```text
documentos/
```

El sistema los leerá automáticamente.

---

# Cómo Agregar Nuevas Preguntas

Editar:

```text
evaluacion/preguntas.json
```

Ejemplo:

```json
{
  "pregunta": "¿Qué es retrieval?",
  "respuesta_correcta": "Retrieval recupera información relevante."
}
```

---

# Cómo Funciona el Pipeline

## Paso 1

Lectura de PDFs

## Paso 2

Limpieza de texto

## Paso 3

Chunking semántico

## Paso 4

Generación de embeddings

## Paso 5

Persistencia vectorial

## Paso 6

Retrieval semántico

## Paso 7

Generación con LLM

## Paso 8

Evaluación y métricas

---

# Qué Falta para Mejorar el Proyecto

## 1. Similarity Score Real

Actualmente se recuperan chunks relevantes.

Se puede mejorar mostrando:

```text
Similarity Score: 0.92
```

---

## 2. Re-ranking Avanzado

Implementar:

* re-ranking semántico
* cosine similarity avanzada
* priorización contextual

---

## 3. Visualización de Embeddings

Implementar:

* PCA
* t-SNE
* clustering semántico

---

## 4. Dashboard de Métricas

Crear:

* gráficas de precision
* recall promedio
* relevancia
* faithfulness

---

## 5. Evaluación Más Robusta

Agregar:

* datasets más grandes
* preguntas complejas
* validación automática avanzada

---

# Problemas Comunes

## Error: ollama.chat is not a function

Solución:

```js
const { Ollama } = require("ollama");
const ollama = new Ollama();
```

---

## Error: pdf is not a function

Instalar versión correcta:

```bash
npm install pdf-parse@1.1.1
```

---

## Error: Headers Timeout Error

Usar modelo más ligero:

```text
phi3
```

---

# Integrantes

* Nombre 1
* Nombre 2
* Nombre 3

---

# Conclusión

El proyecto implementa un sistema RAG local completo utilizando embeddings, retrieval semántico y una base de datos vectorial.

El sistema reduce alucinaciones y mejora la precisión de respuestas mediante recuperación contextual.
