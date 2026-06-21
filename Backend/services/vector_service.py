from sentence_transformers import SentenceTransformer
import chromadb


# model = SentenceTransformer(
#     "all-MiniLM-L6-v2"
# )

_model = None


def get_model():

    global _model

    if _model is None:
        _model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

    return _model

client = chromadb.PersistentClient(
    path="./chroma_db"
)

collection = client.get_or_create_collection(
    "documents"
)
def store_chunks(chunks):

    # embeddings = model.encode(chunks)
    embeddings = get_model().encode(chunks)

    ids = []

    import uuid

    ids = [
        str(uuid.uuid4())
        for _ in chunks
    ]

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings.tolist()
    )

    print("COUNT AFTER ADD =", collection.count())

    return len(chunks)

def get_document_count():
    return collection.count()
def search_chunks(query, n_results=3):

    # query_embedding = model.encode(query)
    query_embeddings = get_model().encode(query)

    results = collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results=n_results
    )

    return {
        "documents": results["documents"][0],
        "distances": results["distances"][0]
    }
def clear_collection():

    global collection

    client.delete_collection(
        "documents"
    )

    collection = client.get_or_create_collection(
        "documents"
    )
