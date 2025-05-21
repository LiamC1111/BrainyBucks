const functions = require("firebase-functions/v1"); // force Cloud Functions v1
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();

const apiKey = functions.config()?.sendgrid?.apikey;
if (!apiKey) {
  console.error("❌ SendGrid API key is missing.");
  throw new Error("SendGrid API key is missing");
}

sgMail.setApiKey(apiKey);

exports.sendConfirmationEmail = functions.https.onCall(async (data, context) => {
  const { email, name, eventTitle } = data;

  const msg = {
    to: email,
    from: 'shenukagunathilake5@gmail.com', // must match your verified sender
    subject: `You're signed up for ${eventTitle}!`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hello ${name || 'there'},</h2>
        <p>🎉 Thank you for signing up for <strong>${eventTitle}</strong>.</p>
        <p>We’re excited to see you there!</p>
        <p>– The BrainyBucks Team</p>
      </div>
    `
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error("SendGrid error:", error);
    throw new functions.https.HttpsError('internal', 'Failed to send confirmation email');
  }
});
