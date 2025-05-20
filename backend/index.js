// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AWS from "aws-sdk";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const ses = new AWS.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-2" // use your actual region
});

app.post("/send-confirmation", async (req, res) => {
  const { email, name } = req.body;

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Data: `Hi ${name},\n\nThank you for contacting BrainyBucks! Our team will get back to you shortly.\n\n— The BrainyBucks Team`,
        },
      },
      Subject: {
        Data: "Thank you for contacting BrainyBucks!",
      },
    },
    Source: "YOUR_VERIFIED_EMAIL@yourdomain.com",
  };

  try {
    await ses.sendEmail(params).promise();
    res.sendStatus(200);
  } catch (err) {
    console.error("SES Error:", err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
