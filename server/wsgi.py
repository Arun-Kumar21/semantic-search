import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from main import SemanticSearch

import queue
import threading
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

CORS(app)

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

semantic_search = SemanticSearch()

processing_queue = queue.Queue()

file_cache = {}

def process_file_worker():
  while True:
    try:
      file_path, filename = processing_queue.get()
      with open(file_path, 'r') as f:
        text = f.read()

        chunks = semantic_search.process_TextFile(text, filename, None)
        
        file_cache[filename] = text

      os.remove(file_path)

    except Exception as e:
      return "processing error"

    finally:
      processing_queue.task_done()

processing_thread = threading.Thread(target=process_file_worker, daemon=True)
processing_thread.start()

@app.route('/api/upload', methods=['POST'])
def upload_file():
  if 'file' not in request.files:
    return jsonify({"error": "Please provide file for processing"}), 400
  
  file = request.files['file']
  if file.filename == '':
    return jsonify({"error": "No File selected"}), 400
  
  try:
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(file_path)

    processing_queue.put((file_path, filename))

    return jsonify({
      'message': 'File uploaded successfully',
      'file_name': filename
    }), 200

  except Exception as e:
    return jsonify({'error': str(e)}), 500

@app.route('/api/search', methods=['POST'])
def query_search():
  try:
    data = request.get_json()
    query = data.get('query', '')

    if not query:
      return jsonify({"error": "Search query is missing"}), 400
    
    results = semantic_search.search(query, 3)

    return jsonify({
      'query': query,
      'results': results,
      'file_cache': file_cache
    })

  except Exception as e:
    print('error:', e)
    return jsonify({"error": str(e)}), 500
  
if __name__=='__main__':
  app.run(debug=True)