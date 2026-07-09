// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDF0QbXvyV02ZV2a1MxmGlzA47KlUfSdJU",
  authDomain: "postai-7a018.firebaseapp.com",
  projectId: "postai-7a018",
  storageBucket: "postai-7a018.firebasestorage.app",
  messagingSenderId: "883276072973",
  appId: "1:883276072973:web:e152f06f28130648f06d44",
  measurementId: "G-XVGLHCTSPY",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Functions setup, connect to local emulator during development
export const functions = getFunctions(app);
if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

export default app;
