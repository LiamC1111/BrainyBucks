
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const loginForm = document.getElementById("login-form");
const errorMsg = document.getElementById("error-msg");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await userCredential.user.reload();
    if (userCredential.user.emailVerified) {
      window.location.href = "profile.html";
    } else {
      errorMsg.innerText = "Email not verified. Please check your inbox.";
    }
  } catch (error) {
    errorMsg.innerText = "Login failed: " + error.message;
  }
});
