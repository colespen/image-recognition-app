// Hugging Face

// send images with text to Hugging Face enpoint and return embedding
const getEmbeddings = async (imageBase64, text) => {
    const data = {
      inputs: {
        image: imageBase64,
        text,
      },
    };
    try {
      const response = await fetch(inferenceEndpointUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${inferenceEndpointToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const json = await response.json();
      return json.embeddings;
    } catch (e) {
      console.log(e);
    }
  };