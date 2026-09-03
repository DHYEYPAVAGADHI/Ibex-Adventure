import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emailTransporter, FROM_EMAIL, CONTACT_EMAIL } from "@/lib/email";

function clean(str: unknown): string {
  if (typeof str !== "string") return "";
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendEmails(opts: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  enquiryId: string;
  ipAddress: string;
}) {
  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];
  if (required.some((v) => !process.env[v])) {
    console.warn("[contact] SMTP not configured — enquiry saved, email skipped");
    return;
  }
  try {
    await emailTransporter.sendMail({
      from: `Ibex Adventure <${FROM_EMAIL}>`,
      replyTo: opts.email,
      to: CONTACT_EMAIL,
      subject: `New Website Enquiry: ${opts.subject || "General"}`,
      text: `Name: ${opts.name}\nEmail: ${opts.email}\nPhone: ${opts.phone}\nSubject: ${opts.subject || "N/A"}\n\n${opts.message}\n\nEnquiry ID: ${opts.enquiryId}\nIP: ${opts.ipAddress}\nSubmitted: ${new Date().toLocaleString()}`,
    });
    await emailTransporter.sendMail({
      from: `Ibex Adventure <${FROM_EMAIL}>`,
      to: opts.email,
      subject: "Thank you for contacting Ibex Adventure",
      text: `Dear ${opts.name},\n\nThank you for reaching out to Ibex Adventure. Your enquiry has been received and our team will get back to you shortly.\n\nRegards,\nIbex Adventure`,
    });
  } catch (err) {
    console.error("[contact] email delivery failed (enquiry still saved):", err);
  }
}

export async function POST(req: Request) {
  let payload: Record<string, unknown> = {};
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const phone = clean(payload.phone);
  const subject = clean(payload.subject);
  const message = clean(payload.message);

  if (!name || !phone || !message) {
    return NextResponse.json(
      { error: "Please provide your name, phone number and a message." },
      { status: 400 }
    );
  }
  if (email && !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "Unknown";

  let enquiry;
  try {
    enquiry = await prisma.enquiry.create({
      data: {
        name,
        email: email || "not-provided@ibexadventure.com",
        phone,
        subject: subject || null,
        message,
        ipAddress,
        userAgent: req.headers.get("user-agent") || "Unknown",
      },
    });
  } catch (err) {
    console.error("[contact] failed to save enquiry:", err);
    return NextResponse.json(
      { error: "We couldn't submit your enquiry. Please WhatsApp us instead." },
      { status: 500 }
    );
  }

  // Fire-and-forget email; never blocks or fails the response.
  if (email) {
    await sendEmails({ name, email, phone, subject, message, enquiryId: enquiry.id, ipAddress });
  }

  return NextResponse.json({ success: true, enquiryId: enquiry.id });
}
