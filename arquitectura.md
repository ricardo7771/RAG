# Arquitectura del Sistema RAG

## Tecnologías

- Node.js
- LanceDB
- Ollama
- Phi3
- Transformers

## Pipeline

1. Lectura PDF
2. Limpieza
3. Chunking semántico
4. Embeddings
5. Almacenamiento vectorial
6. Retrieval semántico
7. Generación con LLM local

## Métricas

- Precision
- Recall
- Faithfulness
- Relevancia

## Contención de Alucinaciones

El sistema usa prompting restrictivo para impedir respuestas fuera del contexto.