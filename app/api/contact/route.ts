import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emailTransporter, FROM_EMAIL, CONTACT_EMAIL } from "@/lib/email";

// Helper for basic sanitization
function sanitizeInput(str: string): string {
  if (!str) return "";
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
}

// Basic email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let payload: any = {};
  
  try {
    try {
      payload = await req.json();
    } catch (parseError) {
      console.error("Failed to parse request JSON:", parseError);
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const { name, email, phone, subject, message } = payload;

    // Phase 10: Validation & Sanitization
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanPhone = sanitizeInput(phone);
    const cleanSubject = sanitizeInput(subject);
    const cleanMessage = sanitizeInput(message);

    if (!cleanName || !cleanEmail || !cleanPhone || !cleanMessage) {
      return NextResponse.json(
        { error: "Missing required fields. Please ensure name, email, phone, and message are provided." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json({ error: "Invalid email address format." }, { status: 400 });
    }

    // Phase 3: Verify Environment Variables
    const requiredEnvVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];
    const missingVars = requiredEnvVars.filter(env => !process.env[env]);
    
    if (missingVars.length > 0) {
      const errorMsg = `SMTP Configuration Error: Missing environment variables: ${missingVars.join(", ")}`;
      console.error(errorMsg);
      // In production, we don't expose which vars are missing to the client.
      const clientMsg = process.env.NODE_ENV === "production" 
        ? "Server configuration error. Please try again later or contact us directly." 
        : errorMsg;
      return NextResponse.json({ error: clientMsg }, { status: 500 });
    }

    // Get IP and User Agent
    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "Unknown";
    const userAgent = req.headers.get("user-agent") || "Unknown";

    // Save Enquiry to Database FIRST to ensure we don't lose it if SMTP fails
    let enquiry;
    try {
      enquiry = await prisma.enquiry.create({
        data: {
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          subject: cleanSubject,
          message: cleanMessage,
          ipAddress,
          userAgent,
        },
      });
    } catch (dbError) {
      console.error("Database Error (Failed to save enquiry):", dbError);
      return NextResponse.json({ error: "Failed to save enquiry to database." }, { status: 500 });
    }

    // Phase 4: Verify SMTP Connection
    try {
      await emailTransporter.verify();
      console.log("SMTP Transporter verified successfully.");
    } catch (verifyError: any) {
      console.error("SMTP Verification Failed:");
      console.error(verifyError);
      return NextResponse.json(
        { error: process.env.NODE_ENV === "production" ? "Email service temporarily unavailable." : `SMTP Verification Error: ${verifyError.message}` },
        { status: 500 }
      );
    }

    // Phase 7 & 8: Construct Email Options
    const adminMailOptions = {
      from: `Ibex Adventure <${FROM_EMAIL}>`, // Phase 7: System email as sender
      replyTo: cleanEmail, // Phase 7: Reply directly to the visitor
      to: CONTACT_EMAIL, // Phase 8: Deliver to the official contact email
      subject: `New Website Enquiry: ${cleanSubject || "No Subject"}`,
      text: `New Website Enquiry\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nPhone: ${cleanPhone}\nSubject: ${cleanSubject || "N/A"}\nMessage:\n${cleanMessage}\n\nSubmitted On: ${new Date().toLocaleString()}\nIP Address: ${ipAddress}`,
      html: `
        <h2>New Website Enquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Enquiry ID:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${enquiry.id}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${cleanName}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${cleanEmail}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${cleanPhone}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Subject:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${cleanSubject || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Submitted On:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>IP Address:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${ipAddress}</td></tr>
        </table>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #ccc; white-space: pre-wrap;">${cleanMessage}</blockquote>
      `,
    };

    // Phase 9: Auto-reply Email to Visitor
    const userMailOptions = {
      from: `Ibex Adventure <${FROM_EMAIL}>`,
      to: cleanEmail,
      subject: `Thank you for contacting Ibex Adventure`,
      text: `Dear ${cleanName},\n\nThank you for contacting Ibex Adventure.\n\nYour enquiry has been received successfully.\n\nOur team will get back to you shortly.\n\nRegards,\n\nIbex Adventure`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <p>Dear ${cleanName},</p>
          <p>Thank you for contacting Ibex Adventure.</p>
          <p>Your enquiry has been received successfully.</p>
          <p>Our team will get back to you shortly.</p>
          <br>
          <p>Regards,</p>
          <p><strong>Ibex Adventure</strong></p>
        </div>
      `,
    };

    try {
      await emailTransporter.sendMail(adminMailOptions);
      await emailTransporter.sendMail(userMailOptions);
    } catch (emailError: any) {
      console.error("SMTP Delivery Error:");
      console.error("Stack:", emailError.stack);
      console.error("SMTP Response:", emailError.response);
      return NextResponse.json(
        { error: process.env.NODE_ENV === "production" ? "Failed to send email. Please try again later." : `SMTP Delivery Error: ${emailError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, enquiryId: enquiry.id });
  } catch (error: any) {
    // Phase 2: Comprehensive Logging
    console.error("=== FATAL ERROR IN CONTACT API ===");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("Payload (sanitized):", { ...payload, message: payload?.message ? "***" : undefined });
    console.error("==================================");

    const clientMessage = process.env.NODE_ENV === "production" 
      ? "Internal server error. Please try again later." 
      : `Internal Server Error: ${error.message}`;

    return NextResponse.json({ error: clientMessage }, { status: 500 });
  }
}
