// frontend/auth.js
import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// DOM элементы — получаем их один раз корректно
const authBox = document.getElementById("auth");
const chatBox = document.getElementById("chatContainer");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login");
const registerBtn = document.getElementById("register");
const googleBtn = document.getElementById("google");

// Показываем/скрываем UI при смене состояния авторизации
onAuthStateChanged(auth, user => {
  if (user) {
    authBox.classList.add("hidden");
    chatBox.classList.remove("hidden");
    console.log("Signed in:", user.email, user.uid);
  } else {
    authBox.classList.remove("hidden");
    chatBox.classList.add("hidden");
  }
});

// Login email/password
loginBtn.addEventListener("click", async () => {
  try {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    if (!email || !password) return alert("Введите email и пароль");
    await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged сработает и покажет чат
  } catch (err) {
    console.error("Login error:", err);
    alert(err.message || "Ошибка входа");
  }
});

// Register email/password
registerBtn.addEventListener("click", async () => {
  try {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    if (!email || !password) return alert("Введите email и пароль");
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Аккаунт создан");
  } catch (err) {
    console.error("Register error:", err);
    alert(err.message || "Ошибка регистрации");
  }
});

// Google sign-in
googleBtn.addEventListener("click", async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (err) {
    console.error("Google sign-in error:", err);
    alert(err.message || "Ошибка Google входа");
  }
});
