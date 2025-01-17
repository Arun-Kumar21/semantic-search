import os
from pathlib import Path
from werkzeug.utils import secure_filename
from ..models.file import File
from datetime import datetime
import uuid

class FileService:
  def __init__(self, upload_folder: Path):
    self.upload_folder = upload_folder

  def save_file(self, file) -> File:
    filename = secure_filename(file.filename)
    file_id = str(uuid.uuid4())
    file_type = filename.split('.')[-1]

    date_folder = datetime.now().strftime('%Y/%m/%d')
    save_path = self.upload_folder / date_folder / file_type
    save_path.mkdir(parents=True, exist_ok=True)

    filepath = save_path / filename
    file.save(filepath)

    return File(
      id=file_id,
      filename=filename,
      filepath=filepath,
      file_type=file_type,
      upload_date=datetime.now(),
      status='uploaded'
    )