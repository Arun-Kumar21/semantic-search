import torch
from transformers import AutoTokenizer, AutoModel
import numpy as np

class VectorEmbedding:
  def __init__(self, model : str, device = "cpu"):
    self.device = device
    self.tokenizer = AutoTokenizer.from_pretrained(model)
    self.model = AutoModel.from_pretrained(model)
    self.dimension = self.model.config.hidden_size  

  def get_embeddings(self, text : str) -> np.ndarray:
    inputs = self.tokenizer(text, padding=True, truncation=True, return_tensors='pt', max_length=512).to(self.device)

    with torch.no_grad():
      outputs = self.model(**inputs)

    attention_mask = inputs['attention_mask']
    mean_output = torch.sum(
      outputs.last_hidden_state * attention_mask.unsqueeze(-1),
      dim=1
    ) / torch.sum(attention_mask, dim=1, keepdim=True)
        
    return mean_output.cpu().numpy()