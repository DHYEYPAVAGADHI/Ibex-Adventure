import nodemailer from "nodemailer";

// Cache the transporter in development so we don't recreate it on every API route compilation
declare global {
  var emailTransporter: nodemailer.Transporter | undefined;
}

const getTransporter = () => {
  if (global.emailTransporter) {
    return global.emailTransporter;
  }

  const host = process.env.SMTP_HOST || "";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";

  if (!host || !user) {
    console.warn("SMTP_HOST or SMTP_USER is not defined in .env. Email sending will be skipped.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  if (process.env.NODE_ENV !== "production") {
    global.emailTransporter = transporter;
  }

  return transporter;
};

export const emailTransporter = getTransporter();

export const FROM_EMAIL = process.env.FROM_EMAIL || "no-reply@ibexadventure.in";
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contact@ibexadventure.in";
