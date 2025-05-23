
# BrainyBucks – Financial Stuff Simplified! 
### COMP3850 PACE – Final Project Implementation  
## 👥 Team - 4

| Name                    | Student ID |
|-------------------------|------------|
| Shenuka Mestiyage Don   | 47833440   |
| Nyla Hussein            | 47733071   |
| Jhon Mark Mateo         | 47822511   |
| Liam Cook               | 47733071   |
| Lucas Mangos            | 47449705   |
| Joanna Marie Oruga      | 46414533   |

---

## 🧠 01. Project Overview

**BrainyBucks** is a financial wellbeing platform built to assist users in managing their money smartly. It provides an interactive web-based ecosystem that allows students to sign up, explore helpful services, register for financial events, and connect with real consultants — all while tracking their progress.

Users can:
- Sign up and verify their accounts
- Join events only after authentication and verification
- View curated services and educational resources
- Submit contact forms with questions (stored in Firebase & sent via email using SendGrid)
- Receive real-time email notifications after signing up for an event or submitting a contact request

This platform brings together Firebase Authentication, Firestore, and SendGrid with a modern UI to build a secure, scalable, and user-friendly platform.

---

## 🚀 02. How the Website Works

🟣 Visit the homepage  
🟡 Sign up and verify your email  
🟢 Access your personal profile  
🟠 Explore and join events  
🔵 Submit a contact form to get help from the BrainyBucks team  
🟤 Admins can manage event creation and view signups  

🔗 Deployed URL: https://brainybucks.onrender.com  


## User View


https://github.com/user-attachments/assets/3dcf7ca5-4586-4ce6-befe-218d2d03d252


## Admin Login View


https://github.com/user-attachments/assets/8de79f88-bb09-47f4-acac-f2922475ca24




---

## 🧰 03. Tech Stack

### 🌐 Frontend

- **HTML5 / CSS3 / JavaScript (Vanilla)**
- **Bootstrap 5**
- **Tailwind CSS** (used selectively)
- **Google Fonts – Quicksand, Lato**
- **Modular file structure** (`index.html`, `signup.html`, `profile.html`, `events.html`, `contact.html`, `admin-events.html`)

### 🔐 Backend

- **Firebase Authentication**
- **Cloud Firestore Database**
- **Firebase Storage**
- **SendGrid API for transactional email sending**

---

## 🔐 04. Firebase Authentication & Verification

### Signup Flow (signup.html)
```js
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const verifiedBtn = document.getElementById("verified-button");

    if (!signupForm || !verifiedBtn) {
      alert("Missing form or verified button");
      return;
    }

    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Clear form + simulate signup
      signupForm.reset();
      signupForm.style.display = "none";
      verifiedBtn.style.display = "block";

      alert("✅ Verification email sent. Please check your inbox.");
    });

    verifiedBtn.addEventListener("click", () => {
      // ✅ Redirect here
      location.href = "thankyou.html";
    });
  });
```
### Login Flow (Login.html)

```js
  import { auth } from './firebase.js';
    import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

    const loginForm = document.getElementById("login-form");
    const errorMsg = document.getElementById("error-msg");

    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      errorMsg.innerText = "";

      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value.trim();

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await userCredential.user.reload();

        if (!userCredential.user.emailVerified) {
          errorMsg.innerText = "Email not verified. Please check your inbox.";
        } else {
          window.location.href = "profile.html";
        }
      } catch (error) {
        errorMsg.innerText = "Login failed: " + error.message;
      }
    });
```

### Email Verification Check (events.html)
```js
onAuthStateChanged(auth, (user) => {
        if (user && user.emailVerified) {
            // User is logged in, hide the login prompt
            if (loginPrompt) {
                loginPrompt.style.display = "none";
            }
        } else {
            // User is not logged in, show the login prompt
            if (loginPrompt) {
                loginPrompt.style.display = "block";
            }
        }
    });
```
```js
// signup.js
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase.js";

async function handleSignup(name, email, phone, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await sendEmailVerification(user);
  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    phone,
    createdAt: new Date()
  });

  alert("Verification email sent! Please verify before logging in.");
}
```
```js
// events.html
const adminEmail = "shenukagunathilake7@gmail.com";
if (auth.currentUser?.email === adminEmail) {
  document.getElementById("addEventForm").style.display = "block";
  // Show edit/delete buttons
}


```

---

## 🔓 05. Admin Role Handling

### Only Admin Can See Signups/Edit/Delete
```js
const adminEmail = "shenukagunathilake7@gmail.com";
isAdmin = currentUser.email === adminEmail;
if (isAdmin) {
          const adminBtns = document.createElement("div");
          adminBtns.className = "admin-controls m-3";
          adminBtns.innerHTML = `
            <button class="btn btn-warning btn-sm edit-btn">Edit</button>
            <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            <button class="btn btn-secondary btn-sm cancel-edit-btn" style="display:none;">Cancel</button>
            <button class="btn btn-success btn-sm save-btn" style="display:none;">Save</button>
          `;

          const editBtn = adminBtns.querySelector(".edit-btn");
          const deleteBtn = adminBtns.querySelector(".delete-btn");
          const cancelEditBtn = adminBtns.querySelector(".cancel-edit-btn");
          const saveBtn = adminBtns.querySelector(".save-btn");
```

---

## 📨 06. SendGrid Email Function (Cloud Function)

### Event Signup Email Function
```js
exports.sendConfirmationEmail = functions.https.onCall(async (data, context) => {
  const { email, name, eventTitle } = data;
  const msg = {
    to: email,
    from: 'shenukagunathilake5@gmail.com',
    subject: `You're signed up for ${eventTitle}!`,
    html: \`<h2>Hello \${name || 'there'},</h2><p>🎉 Thank you for signing up for <strong>\${eventTitle}</strong>.</p>\`
  };
  await sgMail.send(msg);
});
```

### Contact Form Email Function
```js
exports.sendContactConfirmation = functions.https.onCall(async (data, context) => {
  const { email, name } = data;
  const msg = {
    to: email,
    from: 'shenukagunathilake5@gmail.com',
    subject: "Thank you for contacting BrainyBucks Consultants",
    html: \`<h2>Hello \${name},</h2><p>🎉 Thank you for contacting <strong>BrainyBucks Consultants</strong>. A team member will reach out to you shortly.</p>\`
  };
  await sgMail.send(msg);
});
```

---

## 🗂️ 07. Firestore Collections

- `users/`
- `events/`
- `events/{eventId}/signups/`
- `contactSubmissions/`

```js
// Firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}

    
    
    // Events: All users can read, only you (admin) can write
    match /events/{eventId} {
      allow read: if true;
      allow write: if request.auth != null &&
                    request.auth.token.email == "shenukagunathilake7@gmail.com";
    }

    // Event Signups: Each user can manage their own
    match /eventSignups/{userId}/events/{eventId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /events/{eventId}/signups/{signupId} {
      allow read: if request.auth != null;
    }
    
    match /events/{eventId}/signups/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}


    // User Profiles: Only self-access
    match /users/{userId} {
      allow read, update: if request.auth != null && request.auth.uid == userId;
    }

    // Deny everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}

```

---

## Screenshots

### Firebase 

## Firebase Authentication
<img src="images/authentication.png" alt="Firebase Collections" style="width: 100%; height: auto;">

## Firebase Database Structure
<img src="images/dbstructure.png" alt="Firebase Collections" style="width: 100%; height: auto;">

## Firebase Rules
<img src="images/rules.png" alt="Firebase Collections" style="width: 100%; height: auto;">

### Email Notifications 

## Verify your new account email notification
<img src="images/acctverify.png" alt="Firebase Collections" style="width: 100%; height: auto;">

## Event Signup email notification
<img src="images/eventsignup.png" alt="Firebase Collections" style="width: 100%; height: auto;">

## Contact form submission email notification
<img src="images/contact.png" alt="Firebase Collections" style="width: 100%; height: auto;">

### SendGrid email activity feed and Dashboard
<img src="images/sendgrid.png" alt="Firebase Collections" style="width: 100%; height: auto;">
<img src="images/dashboard.png" alt="Firebase Collections" style="width: 100%; height: auto;">




---

## 🧪 09. Testing & Validation

- ✅ Signup + email verification
- ✅ Authenticated profile page
- ✅ Admin-only event CRUD
- ✅ Event join restrictions + confirmation email
- ✅ Contact form email + Firestore

---

## 🧾 10. Conclusion

The BrainyBucks project offers a real-world financial platform with verified login, dynamic events, and instant communications. Built for student empowerment.

