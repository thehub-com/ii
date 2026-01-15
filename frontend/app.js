const authScreen = document.getElementById('auth-screen');
const chatScreen = document.getElementById('chat-screen');

document.getElementById('loginBtn').onclick = () => {
  authScreen.classList.add('hidden');
  chatScreen.classList.remove('hidden');
};

document.getElementById('send').onclick = () => {
  const input = document.getElementById('prompt');
  if (!input.value) return;

  addMsg(input.value, 'user');
  addMsg('Извините, сейчас нет ответа от модели.', 'bot');
  input.value = '';
};

function addMsg(text, type) {
  const div = document.createElement('div');
  div.className = `message ${type}`;
  div.innerText = text;
  document.getElementById('chat').appendChild(div);
}
