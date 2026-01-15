import fetch from "node-fetch";
import { SYSTEM_PROMPT } from "../systemPrompt.js";

export async function askYandex(prompt) {
  const res = await fetch(
    "https://llm.api.cloud.yandex.net/foundationModels/v1/completion",
    {
      method: "POST",
      headers: {
        "Authorization": `Api-Key ${process.env.YC_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        modelUri: `gpt://${process.env.FOLDER_ID}/yandexgpt/latest`,
        completionOptions: {
          temperature: 0.7,
          maxTokens: 2000
        },
        messages: [
          { role: "system", text: SYSTEM_PROMPT },
          { role: "user", text: prompt }
        ]
      })
    }
  );

  const data = await res.json();
  return data.result.alternatives[0].message.text;
}
