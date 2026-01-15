
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import chatStream from "./routes/chatStream.js";
import { limiter } from "./middleware/rateLimit.js";
import { moderate } from "./middleware/moderation.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(moderate);

// 🔥 FRONTEND
app.use(express.static(path.join(__dirname, "../frontend")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// 🔥 API
app.use("/api/chat", chatStream);

app.listen(3000, () => {
  console.log("ABS AI running");
});
