# Enterprise RAG AI Assistant

AI-powered document assistant built using:

- FastAPI
- React
- ChromaDB
- Sentence Transformers
- Groq LLM
- Railway
- Vercel

## Features

- Upload PDF documents
- Automatic chunking
- Vector embeddings
- Semantic search
- Retrieval Augmented Generation (RAG)
- Source attribution
- Hallucination reduction

## Live Demo

Link to the live demo:
[https://enterprise-rag-ai-assistant-prantik.vercel.app/]

## Architecture

PDF
 ↓
Chunking
 ↓
Embeddings
 ↓
ChromaDB
 ↓
Retriever
 ↓
Groq LLM
 ↓
Answer + Sources