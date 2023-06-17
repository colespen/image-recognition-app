from typing import Dict, List, Any
import numpy as np
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
from io import BytesIO
import base64

class EndpointHandler():
    def __init__(self, path=""):
        # Preload all the elements you we need at inference.
        self.model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
        self.processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")


    def __call__(self, data: Dict[str, Any]) -> List[Dict[str, Any]]:
        inputs = data.get("inputs")
        text = inputs.get("text")
        imageData = inputs.get("image")
        image = Image.open(BytesIO(base64.b64decode(imageData)))
        inputs = self.processor(text=text, images=image, return_tensors="pt", padding=True)
        outputs = self.model(**inputs)
        embeddings = outputs.image_embeds.detach().numpy().flatten().tolist()
        return { "embeddings": embeddings }
