import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import { handleImage, handleDeleteUser } from "./handlers.js";

dotenv.config();
const port = process.env.PORT || 8001;

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("hey this a test - ok");
});

app.get("/api/health", async (_, res) => {
  res.send("ok");
});

app.post("/api/image", handleImage);

app.delete("/api/user", handleDeleteUser);

// Start the HTTP server
server.listen(port, () => console.log(`Listening on port ${port}...`));
