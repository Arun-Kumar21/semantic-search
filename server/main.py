from app.config.config import Config
from app.services.vector_embedding import VectorEmbedding
from app.database.db_manager import DatabaseManager
from app.services.vector_seach import VectorSearch
from app.utils.generate_chunk import GenerateChunks
from app.utils.generate_response import generate_response

from typing import Dict

class SemanticSearch:
  def __init__(self):
    self.config = Config()
    self.db_manager = DatabaseManager(self.config.DATABASE_NAME)
    self.embedder = VectorEmbedding(self.config.MODEL_NAME, self.config.DEVICE)
    self.vector_search = VectorSearch(self.embedder, self.db_manager)
    self.chunker = GenerateChunks()

  def process_TextFile(self, text : str, file_name : str, metadata : Dict = None):
    chunks = self.chunker.chunk_by_sentence(text)

    for chunk in chunks:
      embedding = self.embedder.get_embeddings(chunk)[0]
      embedding_id = self.vector_search.add_embedding(embedding)
      self.db_manager.add_chunk(chunk, embedding_id, file_name, metadata)

  def search(self, query : str, k : int = 3, ) -> str:
    results = self.vector_search.search(query, k)
    return generate_response(query, results)
  