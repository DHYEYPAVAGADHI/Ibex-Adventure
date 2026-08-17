const nodemailer = require("nodemailer");

async function testSMTP() {
  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: "contact@ibexadventure.in",
      pass: "Javed@2026",
    },
    logger: true,
    debug: true
  });

  try {
    console.log("Verifying connection...");
    await transporter.verify();
    console.log("Success!");
  } catch (err) {
    console.error("Error:", err);
  }
}

testSMTP();
