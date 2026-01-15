// ===== DOM =====
const chat = document.getElementById("chat");
const input = document.getElementById("prompt");
const send = document.getElementById("send");

// ===== utils =====
function addMessage(author, text) {
  const msg = document.createElement("div");
  msg.className = author === "user" ? "msg user" : "msg bot";
  msg.innerHTML = `<b>${author === "user" ? "Ты" : "ABS AI"}:</b><br>${text}`;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// ===== SEND =====
send.onclick = sendMessage;
input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  input.value = "";

  // индикатор
  const typing = document.createElement("div");
  typing.className = "msg bot";
  typing.innerHTML = "<i>ABS AI думает...</i>";
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text })
    });

    const data = await res.json();
    typing.remove();

    if (data.reply) {
      addMessage("bot", data.reply);
    } else {
      addMessage("bot", "Извините, сейчас нет ответа от модели.");
    }

  } catch (e) {
    typing.remove();
    addMessage("bot", "Ошибка соединения с сервером.");
  }
}
