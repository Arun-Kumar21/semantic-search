from transformers import AutoTokenizer, AutoModel
import numpy as np

class EmbeddingService:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
        self.model = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
    
    def get_embedding(self, text: str) -> np.ndarray:
        if not text or not isinstance(text, str):
            raise ValueError("Input text must be a non-empty string.")

        inputs = self.tokenizer(
            text,
            return_tensors="pt",
            padding="max_length",
            truncation=True,
            max_length=512
        )

        outputs = self.model(**inputs)

        # Return the mean of the last hidden state
        return outputs.last_hidden_state.mean(dim=1).detach().numpy()
