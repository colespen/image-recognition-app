const queryEmbedding = async ({ values, namespace }) => {
    const index = pineconeClient.Index(indexName);
    const queryRequest = {
      topK: 1, // # of results to get from index
      vector: values,
      includeMetadata: true,
      namespace, // limit results to embeddings of user
    };
    try {
      const response = await index.query({ queryRequest });
      const match = response.matches[0];
      const metadata = match?.metadata;
      const score = match?.score;
      return {
        label: metadata?.label || "Unknown",
        confidence: score,
      };
    } catch (e) {
      console.log("failed", e);
    }
  };