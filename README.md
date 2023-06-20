# image-recognition-app

An informative tutorial by [Roie Schwaber-Cohen](https://www.pinecone.io/learn/pinecone-vision-app/) that I experimented with

Hugging Face - host custom AI model via API endpoint
Pinecone - vector database to query embedding generated my CLIP
React-Native - framework
Vercel - deployment

#### frontend: React-Native --
- training mode: image from device --> backend w/ label set by the user
- detection mode: display detected label based on recognized image via camera

#### backend: Node.js -- 
- receives images from device
- handles training and detecting states
    - communicates with Hugging Face inference endpoint and Pinecone vector db API
