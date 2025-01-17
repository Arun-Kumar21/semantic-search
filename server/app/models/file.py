from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

@dataclass
class File:
  id: str
  filename: str
  filepath: Path
  file_type: str
  upload_date: datetime
  status: str
  embedding_path: str = None