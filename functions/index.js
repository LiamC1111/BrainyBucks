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
subject: `🎉 You're Signed Up for ${eventTitle}!`,
html: `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f3ff; border-radius: 10px; max-width: 600px; margin: auto;">
    <h2 style="color: #6f42c1;">Hi ${name || 'there'},</h2>

    <p style="font-size: 16px; color: #333;">
      🎉 Thank you for signing up for <strong>${eventTitle}</strong> with <strong>BrainyBucks</strong>!
    </p>

    <p style="font-size: 16px; color: #333;">
      We're thrilled to have you join us. This event is designed to empower you with knowledge, tools, and strategies to take control of your financial life.
    </p>

    <p style="font-size: 16px; color: #333;">
      Stay tuned for reminders and updates. We'll be sharing all event details shortly. Be sure to mark your calendar and get ready for a valuable experience!
    </p>

    <p style="font-size: 16px; color: #333;">
      If you have any questions before the event, feel free to reply to this email.
    </p>

    <p style="margin-top: 2rem; font-size: 16px; color: #555;">
      The BrainyBucks Team<br/>
      <small style="color: #999;">Helping you build a smarter financial future.</small>
    </p>
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

exports.sendContactConfirmationEmail = functions.https.onCall(async (data, context) => {
    const { email, name } = data;
  
    const msg = {
      to: email,
      from: 'shenukagunathilake5@gmail.com',
      subject: 'Thank You for Contacting BrainyBucks Consultants',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Hello ${name || 'there'},</h2>

<p>🎉 Thank you for reaching out to <strong>BrainyBucks Consultants</strong>! We're thrilled that you’ve taken the first step toward taking control of your financial future.</p>

<p>Our team has received your message and one of our trusted consultants will be in touch with you shortly. Whether you’ve asked about budgeting, investments, retirement planning, or just need a fresh start — we’re here to guide you with expert advice tailored just for you.</p>

<p>We aim to respond within <strong>1–2 business days</strong>, but often get back even sooner.</p>

<p>In the meantime, feel free to browse our website and check out our <a href="https://brainybucks.onrender.com/events.html" style="color: #6f42c1; text-decoration: underline;">upcoming workshops and events</a>.</p>

<p>Thank you again for trusting BrainyBucks. We’re excited to help you build the financial confidence you deserve!</p>

<p style="margin-top: 2rem;">Warm regards,<br>
<strong>The BrainyBucks Team</strong><br>
<small style="color: #666;">Real people. Real solutions. Real impact.</small></p>

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
  

