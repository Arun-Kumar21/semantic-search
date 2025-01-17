import os
from pathlib import Path

class Config:
  SECRET_KEY = ''
  UPLOAD_FOLDER = Path('uploads')
  MAX_CONTENT_LENGTH = 100 * 1024 * 1024
  ALLOWED_EXTENSIONS = {'pdf', 'txt', 'mdx'}
