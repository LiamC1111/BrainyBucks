import { auth, db } from '../firebase.js';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const signupForm = document.getElementById("signup-form");
const verifiedBtn = document.getElementById("verified-button");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const phone = document.getElementById("phone").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    await setDoc(doc(db, "users", userCredential.user.uid), { name, email, phone });

    signupForm.reset();
    signupForm.style.display = "none";
    verifiedBtn.style.display = "block";
  } catch (error) {
    alert("Signup failed: " + error.message);
  }
});

verifiedBtn.addEventListener("click", () => {
  window.location.href = "thankyou.html";
});
