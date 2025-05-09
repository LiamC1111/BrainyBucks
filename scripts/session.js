// session.js
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

function updateProfileLink() {
    const profileLink = document.querySelector("a[href='signup.html']");
    onAuthStateChanged(auth, (user) => {
        if (user && user.emailVerified) {
            profileLink.href = "profile.html";
        } else {
            profileLink.href = "signup.html";
        }
    });
}

updateProfileLink();
