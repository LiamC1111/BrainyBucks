const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure your email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shenukagunathillkae7@@gmail.com',  // Your Gmail address
        pass: 'recu gsua otpm bvak'      // Your Gmail App Password
    }
});

// Cloud function triggered when a new event signup is created
exports.sendSignupConfirmation = functions.firestore
    .document("events/{eventId}/signups/{userId}")
    .onCreate(async (snap, context) => {
        const signupData = snap.data();
        const userEmail = signupData.email;
        const eventName = signupData.title;
        const userName = signupData.name;

        const mailOptions = {
            from: 'no-reply@brainybucks.com',  // Your custom "from" email
            to: userEmail,
            subject: `Thank You for Signing Up for ${eventName}!`,
            text: `Hello ${userName},\n\nThank you for signing up for the event "${eventName}".\nWe look forward to seeing you there!\n\nBest,\nBrainyBucks Team`
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${userEmail} for event: ${eventName}`);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    });
