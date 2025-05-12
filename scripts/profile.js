
import { auth, db } from '../firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const userInfo = document.getElementById("user-info");
const logoutBtn = document.getElementById("logout");

onAuthStateChanged(auth, async (user) => {
  if (user && user.emailVerified) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      userInfo.innerText = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}`;
    }
  } else {
    window.location.href = "login.html";
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
