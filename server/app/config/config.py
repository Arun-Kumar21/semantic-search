class Config:
  MODEL_NAME = 'sentence-transformers/all-MiniLM-L6-v2'
  DATABASE_NAME = "vector_embeddings.db"
  MAX_LENGTH =  512
  BATCH_SIZE = 32
  DEVICE = "cpu"