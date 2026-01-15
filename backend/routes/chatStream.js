import express from "express";
import { askYandex } from "../services/yandexLLM.js";

const router = express.Router();

router.post("/", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const answer = await askYandex(req.body.prompt);
    for (const word of answer.split(" ")) {
      res.write(`data: ${word}\n\n`);
      await new Promise(r => setTimeout(r, 30));
    }
    res.write("data: [DONE]\n\n");
    res.end();
  } catch {
    res.write("data: [ERROR]\n\n");
    res.end();
  }
});

export default router;
