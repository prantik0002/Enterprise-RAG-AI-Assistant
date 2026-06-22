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

```text
User Uploads PDF
        │
        ▼
Text Extraction
        │
        ▼
Document Chunking
        │
        ▼
Embedding Generation
        │
        ▼
ChromaDB Vector Database
        │
        ▼
Semantic Similarity Search
        │
        ▼
Relevant Context Retrieval
        │
        ▼
Groq LLM
        │
        ▼
AI-Generated Answer + Sources

```

## Roadmap (V2)

Upcoming enhancements planned for Version 2:

- Multi-document knowledge base support
- Conversational chat memory
- Streaming AI responses for real-time generation
- Advanced source citation with page-level references
- User authentication and document isolation
- Support for DOCX, TXT, and additional file formats
- Hybrid search (Semantic + Keyword Search)
- Document management dashboard
- Chat history persistence
- Improved retrieval and reranking pipeline
- Docker containerization
- Production monitoring and analytics
- Multi-user enterprise deployment support