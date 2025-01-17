from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

from .config import Config
from .extensions import socketio
from .routes import api

def create_app(config_class = Config):
  app = Flask(__name__)
  CORS(app, resources={r"/api/upload": {"origins": "http://localhost:5173"}})
  app.config.from_object(config_class)

  socketio.init_app(app, cors_allowed_origins="*")

  app.register_blueprint(api.api_bp, url_prefix='/api')
  
  return app