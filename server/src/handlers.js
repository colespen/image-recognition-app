// receive images from device
const handleImage = async (req, res) => {
  const data = req.body;

  const { data: imageData, uri, label, stage, user } = data;
  const id = `${label}-${md5(uri)}`;
  const userHash = md5(user);
  const text = "default";
  try {
    const embeddings = await getEmbeddings(imageData, [text]);
    const result = await handleEmbedding({
      id,
      embeddings,
      text,
      label,
      stage,
      user: userHash,
    });
    res.json(result);
  } catch (e) {
    const message = `Failed handling embedding: ${e}`;
    console.log(message, e);
    res.status(500).json({ message });
  }
};

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