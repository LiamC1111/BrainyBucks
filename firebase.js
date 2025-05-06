
// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3F0SKl5WYVIzIRSevQTtX2X30SvspVEM",
  authDomain: "brainybucks-d8c0f.firebaseapp.com",
  projectId: "brainybucks-d8c0f",
  storageBucket: "brainybucks-d8c0f.firebasestorage.app",
  messagingSenderId: "236075202641",
  appId: "1:236075202641:web:fa8f5370e467b0f2cea070",
  measurementId: "G-Y7S4LRCLR5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
