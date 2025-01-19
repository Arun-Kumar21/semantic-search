import nltk
from typing import List
nltk.download('punkt')
nltk.download('punkt_tab')

class GenerateChunks:
  @staticmethod
  def chunk_by_sentence(text : str) -> List[str]:
    return nltk.sent_tokenize(text)
  
  @staticmethod
  def chunk_by_paragraphs(text : str) -> List[str]:
    return [p.strip() for p in text.split('\n\n') if p.strip()]