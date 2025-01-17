from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename

from ..extensions import socketio
from ..services.file_service import FileService
from ..services.embedding_service import EmbeddingService
from ..services.search_service import SearchService
from ..utils.file_processors import FileProcessor
from ..config import Config

api_bp = Blueprint('api', __name__)
file_service = FileService(Config.UPLOAD_FOLDER)
embedding_service = EmbeddingService()
search_service = SearchService()


@api_bp.route('/upload', methods=['POST'])
def upload_file():
  if 'file' not in request.files:
    return jsonify({'error' : 'Please attack file'}), 400
  
  file = request.files['file']
  if file.filename == '':
    return jsonify({'error' : 'No selected file'}), 400
  
  try : 
    # Save File
    saved_file = file_service.save_file(file)
    socketio.emit('processing_status', {
      'status' : 'started',
      'file' : saved_file.filename
    })

    # Extract text
    socketio.emit('processing_status', {
      'status' : 'extracting',
      'file' : saved_file.filename
    })
    text = FileProcessor.extract_text(saved_file.filepath)

    # Generate Embedding
    socketio.emit('processing_status', {
      'status' : 'embeddings',
      'file' : saved_file.filename
    })
    embedding = embedding_service.get_embedding(text)

    # Add to search index
    socketio.emit('processing_status', {
      'status' : 'indexing',
      'file' : saved_file.filename
    })
    search_service.add_embedding(embedding)

    socketio.emit('processing_status', {
      'status' : 'completed',
      'file' : saved_file.filename
    })

    return jsonify({
      'success' : True,
      'file_id' : saved_file.id,
      'filename' : saved_file.filename
    }), 200
  

  except Exception as e:
    socketio.emit('processing_status', {
      'status' : 'error',
      'file' : file.filename,
      'error' : str(e)
    })

    return jsonify({'error' : str(e)}), 500

@api_bp.route('/search', methods=['POST'])
def search():
  data = request.get_json()
  query = data.get('query', '')

  query_embedding = embedding_service.get_embedding(query)
  distance, indices = search_service.search(query_embedding)

  return jsonify({
    'result' : indices.tolist(),
    'distances' : distance.tolist()
  })

