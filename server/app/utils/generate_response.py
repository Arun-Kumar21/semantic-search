from typing import List, Dict

def generate_response(query : str, context : List[Dict]) -> str:
  if context:
    return f"Based on the search results, here's the most relevant information:\n{context[0]['text']}"

  return "No relevant information found."