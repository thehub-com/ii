import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// для ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors());
app.use(express.json());

// 👉 FRONTEND
const frontendPath = path.join(__dirname, "../publish");
app.use(express.static(frontendPath));

// 👉 API
app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Пустой запрос" });
  }

  // временный ответ (проверка связки)
  res.json({
    reply: `ABS AI получил: ${prompt}`
  });
});

// 👉 fallback (ОБЯЗАТЕЛЬНО)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// старт
app.listen(PORT, () => {
  console.log("ABS AI backend running on port", PORT);
});
