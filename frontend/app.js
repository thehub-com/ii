const chat = document.getElementById("chat");
const send = document.getElementById("send");
const promptInput = document.getElementById("prompt");

if (!navigator.onLine) {
  document.body.innerHTML = `
    <div style="text-align:center;margin-top:40%">
      <h2>⏳ Жду подключения к интернету</h2>
    </div>
  `;
}

send.onclick = async () => {
  const text = promptInput.value.trim();
  if (!text) return;

  chat.innerHTML += `<div class="msg user">Ты: ${text}</div>`;
  promptInput.value = "";

  const res = await fetch("https://ii-z1jt.onrender.com/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: text })
  });

  const data = await res.json();
  chat.innerHTML += `<div class="msg ai">ABS AI: ${data.answer || "Ошибка"}</div>`;
  chat.scrollTop = chat.scrollHeight;
};
