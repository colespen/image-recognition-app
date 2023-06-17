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
