import sqlite3
import json 
from typing import Dict, Optional

class DatabaseManager :
  def __init__(self, db_name:str):
    self.db_name = db_name
    self.init_database()

  def init_database(self):
    with sqlite3.connect(self.db_name) as conn:
      c = conn.cursor()
      c.execute('''
        CREATE TABLE IF NOT EXISTS chunks
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
         text TEXT NOT NULL,
         file_name TEXT,
         embedding_id INTEGER)
      ''')
      conn.commit()

  def add_chunk(self, text : str, embedding_id : int, file_name : str, metadata : Optional[Dict] = None):
    with sqlite3.connect(self.db_name) as conn:
      c = conn.cursor()
      c.execute('''
        INSERT INTO chunks (text, file_name, embedding_id)
        VALUES (?, ?, ?)
        ''', (text, file_name, embedding_id))

      conn.commit()

  def get_chunk_by_embedding_id(self, embedding_id):
    with sqlite3.connect(self.db_name) as conn:
      c = conn.cursor()
      c.execute(f"SELECT text, file_name FROM chunks WHERE embedding_id={embedding_id};")

      return c.fetchone()