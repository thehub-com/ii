import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./firebase.js";

export const auth = getAuth(app);
export const login = () => signInWithPopup(auth, new GoogleAuthProvider());
