// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeTJ4yPZ0JkOvyq2xJLlB4eqpeFZWNJVQ",
  authDomain: "integrador-moviles.firebaseapp.com",
  projectId: "integrador-moviles",
  storageBucket: "integrador-moviles.firebasestorage.app",
  messagingSenderId: "1055127329024",
  appId: "1:1055127329024:web:607b922f98676c49eabbe5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);