from main import SemanticSearch

semantic_search = SemanticSearch()

with open('./deep-space.txt', 'r') as fs:
  text = fs.read()
  semantic_search.process_TextFile(
    text,
    'deep-space.txt',
    metadata={'author': 'John Doe', 'date': '2025-01-19'}
  )

query = "What author describe in 'Exploring the Depths of Space: A Journey Beyond Our Planet' para"
res = semantic_search.search(query, k=3)
print(res)