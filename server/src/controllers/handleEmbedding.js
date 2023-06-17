

// handles training and detecting states of application
    // training: send embeddings, id and metadata (incl. label) to saveEmbedding()
    // detecting: sends embeddings and id to queryEmbedding()

// use `user` identifier to write and read embeddings to a namepsapce in Pinecone 
// which keep diff. user data separate
const handleEmbedding = async ({
    id,
    embeddings,
    text,
    label,
    stage,
    user,
  }) => {
    switch (stage) {
      case "training":
        return await saveEmbedding({
          id,
          values: embeddings,
          namespace: user,
          metadata: { keywords: text, label },
        });
      case "detecting":
        return await queryEmbedding({
          values: embeddings,
          namespace: user,
        });
    }
  };