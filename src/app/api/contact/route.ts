import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.your-provider.com"; // TODO: replace with your SMTP host
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 587); // TODO: replace with your SMTP port
const SMTP_SECURE = process.env.SMTP_SECURE === "true"; // TODO: set true for SSL (465), false for TLS (587)
const SMTP_USER = process.env.SMTP_USER ?? "your-smtp-username"; // TODO: replace with your SMTP username
const SMTP_PASS = process.env.SMTP_PASS ?? "your-smtp-password"; // TODO: replace with your SMTP password
const MAIL_FROM = process.env.MAIL_FROM ?? "Portfolio Contact <no-reply@yourdomain.com>"; // TODO: replace sender
const MAIL_TO = process.env.MAIL_TO ?? "your-email@yourdomain.com"; // TODO: replace receiver email

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const hasPlaceholderConfig = () => {
  return (
    SMTP_HOST.includes("your-provider") ||
    SMTP_USER.includes("your-smtp-username") ||
    SMTP_PASS.includes("your-smtp-password") ||
    MAIL_TO.includes("your-email@")
  );
};

const normalizePayload = (payload: Partial<ContactPayload>): ContactPayload => ({
  name: payload.name?.trim() ?? "",
  email: payload.email?.trim() ?? "",
  message: payload.message?.trim() ?? ""
});

const escapeHtml = (value: string) => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
};

export async function POST(request: NextRequest) {
  try {
    const rawPayload = (await request.json()) as Partial<ContactPayload>;
    const payload = normalizePayload(rawPayload);

    if (!payload.name || !payload.email || !payload.message) {
      return NextResponse.json(
        { ok: false, message: "Please fill name, email, and message." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(payload.email)) {
      return NextResponse.json({ ok: false, message: "Please provide a valid email address." }, { status: 400 });
    }

    if (hasPlaceholderConfig()) {
      return NextResponse.json(
        {
          ok: false,
          message: "SMTP is not configured yet. Update SMTP_* and MAIL_* values in your environment file."
        },
        { status: 500 }
      );
    }

    const safeName = escapeHtml(payload.name);
    const safeEmail = escapeHtml(payload.email);
    const safeMessage = escapeHtml(payload.message).replaceAll("\n", "<br/>");

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: payload.email,
      subject: `Portfolio Contact: ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        "",
        "Message:",
        payload.message
      ].join("\n"),
      html: `
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `
    });

    return NextResponse.json({ ok: true, message: "Message sent successfully." }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong while sending email.";

    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
