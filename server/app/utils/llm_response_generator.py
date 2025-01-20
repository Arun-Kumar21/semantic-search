from typing import Dict, List
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import torch


class LLMResponseGenerator:
  def __init__(self, model_type : str = 'local'):
    model_name = 'gpt2'

    if model_type == 'local':
      self.tokenizer = AutoTokenizer.from_pretrained(model_name)
      self.model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16, device_map="auto")

      self.generator = pipeline(
        "text-generation",
        model=self.model,
        tokenizer=self.tokenizer,
        max_new_tokens=256,
        temperature=0.7
      )
      

    # else :
      # Support for openai api key

  def _prepare_context(self, query, results : List[Dict]) -> str :
    sorted_results = sorted(results, key=lambda x: x['similarity_score'], reverse=True)

    context = "Context information:\n"
    for idx, result in enumerate(sorted_results[:3], 1):
      context += f"{idx}. {result['text']}\n"

    return context
    
  def _create_prompt(self, query : str, context : str) -> str :
    return f"""
    from given context select best point for query and return that point in clear, concise way and if context are not related to query then return "I can't response to this query".

    Context:
    {context}

    Query:
    {query}

    Answer:
    """

    
  def generate_response(self, query: str, results: List[Dict]) -> Dict:
    context = self._prepare_context(query, results)
    prompt = self._create_prompt(query, context)

    response = self.generator(prompt)[0]['generated_text']

    main_answer = response.split("Answer:")[-1].strip()

    return {
        "main_response": main_answer,
        "support_info": results[:3],
    }
