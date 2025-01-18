import faiss
import numpy as np
from pathlib import Path

class SearchService:
    def __init__(self, index_path: Path = None, embedding_path: Path = None):
        self.index = None
        self.embedding_path = embedding_path

        if index_path and index_path.exists():
            self.index = faiss.read_index(str(index_path))
        else:
            self.index = None 

        if embedding_path and embedding_path.exists():
            # Load stored embeddings from disk if they exist
            self.embeddings = np.load(embedding_path)
        else:
            self.embeddings = None 

    def add_embedding(self, embedding: np.ndarray):
        if embedding.ndim == 1:
            embedding = embedding.reshape(1, -1)

        if self.index is None:
            self.index = faiss.IndexFlatL2(embedding.shape[1])

        self.index.add(embedding)

        if self.embeddings is None:
            self.embeddings = embedding
        else:
            self.embeddings = np.vstack([self.embeddings, embedding])

    def search(self, query_embedding: np.ndarray, k=5):
        if self.index is None or self.index.ntotal == 0: 
            raise ValueError("The index is empty. Add embeddings before searching.")
        if query_embedding.ndim == 1:
            query_embedding = query_embedding.reshape(1, -1)
        return self.index.search(query_embedding, k)

    def save_index(self, index_path: Path, embedding_path: Path):
        if self.index is not None:
            faiss.write_index(self.index, str(index_path))
        else:
            raise ValueError("No index to save.")

        if self.embeddings is not None:
            # Save the embeddings as a .npy file
            np.save(str(embedding_path), self.embeddings)
        else:
            raise ValueError("No embeddings to save.")