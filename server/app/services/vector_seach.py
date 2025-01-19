import faiss
import numpy as np
from typing import List, Dict
import json

from ..database.db_manager import DatabaseManager
from .vector_embedding import VectorEmbedding

class VectorSearch:
  def __init__(self, embedder : VectorEmbedding, db_manager : DatabaseManager):
    self.embedder = embedder
    self.db_manager = db_manager
    self.index = faiss.IndexFlatL2(self.embedder.dimension)

  def add_embedding(self, embedding: np.ndarray) -> int:
    self.index.add(embedding.reshape(1, -1))
    return self.index.ntotal - 1
  
  def search(self, query : str, k=3) -> List[Dict]:
    query_embedding = self.embedder.get_embeddings(query)[0]
    D, I = self.index.search(query_embedding.reshape(1, -1), k)

    results = []
    for idx, distance in zip(I[0], D[0]):
      text, file_name = self.db_manager.get_chunk_by_embedding_id(idx)
      results.append({
        'text' : text,
        'similarity_score' : float(1 / (1 + distance)),
        'file_name' : file_name
      })

    return results
