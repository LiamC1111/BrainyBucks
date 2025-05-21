
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

### Signup Flow (auth.js)
```js
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    sendEmailVerification(user);
    alert("Verification email sent. Please verify your email before logging in.");
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

## 📸 08. Screenshot Examples

```markdown
<img src="images/readme/firestore-structure.png" width="400"/>
<img src="images/readme/sendgrid-email.png" width="400"/>
```

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

