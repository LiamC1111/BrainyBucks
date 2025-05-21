
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
- **Firebase Hosting (for dev)**
- **SendGrid API for transactional email sending**

---

## 🔐 04. Firebase Authentication Setup

- Firebase Auth used for secure user registration, login, and email verification.
- Email/password sign-up flow with client-side validation.
- Email verification must be completed before accessing protected pages like `events.html`.
- Only after verification, users can:
  - Join events
  - View profile page
- Used `onAuthStateChanged()` to manage session visibility and gate content access.

### ✨ Profile Page Features:
- View:
  - Name
  - Phone number
  - Email
  
  

---

## 🗂️ 05. Firestore Collections

- **`users/`** – Stores profile data for each authenticated user.
- **`events/`** – Events created by the admin (title, date, image, description).
- **`events/{eventId}/signups/`** – Tracks user signups for each event.

---

## ✉️ 06. Email Notification System

### Event Join Email (SendGrid + Firebase Functions)
- Once a user joins an event, Firebase Cloud Function triggers a SendGrid email.
- Personalized email template with event title and user name.
- Sent from: `shenukagunathilake5@gmail.com` (verified sender)

### Contact Form Email
- When a user submits the contact form:
  - Data is saved to Firestore
  - A confirmation email is sent via SendGrid with a “Thank you” message
- Email subject: `Thank you for contacting BrainyBucks Consultants`
- Custom email HTML used to match brand look

---

## 📱 07. Screens Overview

| Page | Description |
|------|-------------|
| `index.html` | Homepage with nav, footer, call-to-action |
| `signup.html` | Registration + Login with email verification |
| `thankyou.html` | Post-signup verification page |
| `profile.html` | Authenticated user profile |
| `events.html` | Public list of events (join only if verified) |
| `admin-events.html` | Admin-only page to manage events |
| `contact.html` | Contact form integrated with Firestore + SendGrid |

---

## 🧪 08. Testing & Validation

- ✅ Manual testing for all user journeys: sign up, verify, log in, join events
- ✅ Admin CRUD (event create/edit/delete)
- ✅ Form validation on all fields (signup, contact form)
- ✅ Firebase rules tested:
  - Only authenticated users can join events
  - Only admin (email-based) can create/edit/delete events

---

## 🗃️ 09. Folder Structure

```
BrainyBucks/
├── index.html
├── signup.html
├── profile.html
├── contact.html
├── events.html
├── admin-events.html
├── scripts/
│   ├── auth.js
│   ├── profile.js
│   ├── events.js
│   └── contact.js
├── css/
│   ├── global.css
│   ├── navbar.css
│   ├── footer.css
├── assets/
│   ├── Logos/
│   ├── footer/
│   └── favicon_io/
├── server/
│   └── sendEmail.js (Node.js + SendGrid)
├── firebase.js
└── README.md
```

---

## 📦 10. Dependencies

| Tool | Purpose |
|------|---------|
| Firebase | Auth, Firestore, Storage |
| SendGrid | Email service |
| Bootstrap 5 | Styling |
| Tailwind (optional) | Utility classes |
| Node.js | Backend for email sending |
| Express.js | API routes for secure communication |

---

## 🧾 11. Conclusion

The BrainyBucks project offers a real-world web experience with full-stack features like authentication, CRUD operations, and email communication. With modern UI and backend integrations, it’s a functional financial empowerment platform for students. It successfully integrates event handling, contact forms, and cloud function automation.

---
