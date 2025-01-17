import PyPDF2
import markdown
from pathlib import Path

class FileProcessor:
    @staticmethod
    def extract_text(file_path: Path) -> str:
        ext = file_path.suffix.lower()

        # Ensure the file exists
        if not file_path.exists():
            raise FileNotFoundError(f"The file {file_path} does not exist.")

        try:
            # PDF processing
            if ext == '.pdf':
                with open(file_path, 'rb') as file:
                    reader = PyPDF2.PdfFileReader(file)
                    text = ' '.join([page.extract_text() for page in reader.pages])
                    
                    if not text.strip():
                        raise ValueError("No text found in the PDF.")
                    return text
            
            # MDX (Markdown) file processing
            elif ext == '.mdx':
                with open(file_path, 'r') as file:
                    return markdown.markdown(file.read())
            
            # Text file processing
            else:
                with open(file_path, 'r') as file:
                    return file.read()

        except Exception as e:
            print(f"Error processing the file {file_path}: {e}")
            raise
