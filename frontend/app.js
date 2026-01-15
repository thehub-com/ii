const chat = document.getElementById("chat");
const input = document.getElementById("prompt");
const send = document.getElementById("send");

send.onclick = sendMsg;
input.onkeydown = e => e.key === "Enter" && sendMsg();

async function sendMsg() {
  const text = input.value.trim();
  if (!text) return;
  input.value = "";

  chat.innerHTML += `<div class="message user">${text}</div>`;
  const ai = document.createElement("div");
  ai.className = "message ai";
  chat.appendChild(ai);

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: text })
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    decoder.decode(value).split("\n\n").forEach(l => {
      if (l.startsWith("data: ")) {
        const d = l.replace("data: ", "");
        if (d !== "[DONE]") ai.textContent += d + " ";
      }
    });
  }
}
