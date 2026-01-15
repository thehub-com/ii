import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const authBox = document.getElementById("auth");
const chatBox = document.getElementById("chatContainer");

onAuthStateChanged(auth, user => {
  if (user) {
    authBox.classList.add("hidden");
    chatBox.classList.remove("hidden");
  }
});

document.getElementById("login").onclick = () => {
  signInWithEmailAndPassword(
    auth,
    email.value,
    password.value
  ).catch(alert);
};

document.getElementById("register").onclick = () => {
  createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
  ).catch(alert);
};

document.getElementById("google").onclick = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).catch(alert);
};
