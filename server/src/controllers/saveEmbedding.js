

// Pinecone

// select index and write using `index.upsert` method
const saveEmbedding = async ({ id, values, metadata, namespace }) => {
    const index = pineconeClient.Index(indexName);
    const upsertRequest = {
      vectors: [
        {
          id,
          values,
          metadata,
        },
      ],
      namespace,
    };
    try {
      const response = await index.upsert({ upsertRequest });
      return response?.upsertedCount > 0
        ? {
            message: "training",
          }
        : {
            message: "failed training",
          };
    } catch (e) {
      console.log("failed", e);
    }
  };

  