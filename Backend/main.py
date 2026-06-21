from fastapi import FastAPI, UploadFile, File
from services.pdf_service import process_pdf
from services.vector_service import (
    store_chunks,
    get_document_count,
    search_chunks
)
from pydantic import BaseModel
from services.llm_service import generate_answer
from services.vector_service import clear_collection
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...)
):
    clear_collection()

    chunks = process_pdf(
        file.file
    )

    stored = store_chunks(
        chunks
    )

    return {
        "filename": file.filename,
        "chunks_created": len(chunks),
        "stored_in_vector_db": stored
    }

class QueryRequest(BaseModel):
    query: str

@app.get("/vector-count")
def vector_count():

    return {
        "documents": get_document_count()
    }

@app.post("/search")
def search(request: QueryRequest):

    results = search_chunks(
        request.query
    )

    return {
        "query": request.query,
        "results": results
    }

@app.post("/ask")
def ask(request: QueryRequest):

    search_results = search_chunks(
        request.query
    )

    context = "\n\n".join(
        search_results["documents"]
    )

    answer = generate_answer(
        request.query,
        context
    )

    return {
        "question": request.query,
        "answer": answer,
        "sources": [
            doc[:150] + "..."
            for doc in search_results["documents"]
        ]
    }  

@app.delete("/reset")
def reset():

    clear_collection()

    return {
        "message": "Vector database cleared"
    } 