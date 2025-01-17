import faiss
import numpy as np
from pathlib import Path

class SearchService:
    def __init__(self, index_path: Path = None):
        self.index = None

        if index_path and index_path.exists():
            self.index = faiss.read_index(str(index_path))
        else:
            self.index = None 

    def add_embedding(self, embedding: np.ndarray):
        if self.index is None:
            self.index = faiss.IndexFlatL2(embedding.shape[1])

        if embedding.ndim == 1:
            embedding = embedding.reshape(1, -1)
        self.index.add(embedding)

    def search(self, query_embedding: np.ndarray, k=5):
        if query_embedding.ndim == 1:
            query_embedding = query_embedding.reshape(1, -1)
        return self.index.search(query_embedding, k)

    def save_index(self, path: Path):
        faiss.write_index(self.index, str(path))

