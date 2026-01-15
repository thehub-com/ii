import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(express.json());
app.use(express.static(path.join(__dirname, "publish")));

/* ===== HEALTH CHECK ===== */
app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

/* ===== CHAT API ===== */
app.post("/api/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    if (!prompt) {
      return res.json({ reply: "Пустой запрос." });
    }

    const response = await fetch(
      "https://llm.api.cloud.yandex.net/foundationModels/v1/completion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Api-Key ${process.env.YA_API_KEY}`
        },
        body: JSON.stringify({
          modelUri: `gpt://${process.env.YA_FOLDER_ID}/yandexgpt-lite`,
          completionOptions: {
            stream: false,
            temperature: 0.6,
            maxTokens: 300
          },
          messages: [
            { role: "user", text: prompt }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.result?.alternatives?.[0]?.message?.text ||
      "Извините, сейчас нет ответа от модели.";

    res.json({ reply });

  } catch (err) {
    console.error("API ERROR:", err);
    res.json({ reply: "Ошибка сервера." });
  }
});

/* ===== START ===== */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("ABS AI backend running on port", PORT);
});
