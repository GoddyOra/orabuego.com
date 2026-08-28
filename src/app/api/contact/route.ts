import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission." },
      { status: 400 }
    );
  }

  // Honeypot tripped — pretend success so the bot doesn't learn anything.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    console.error(
      "Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set."
    );
    return NextResponse.json(
      { error: "Contact form isn't configured yet." },
      { status: 503 }
    );
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    // Resend's shared sandbox address — works without domain verification.
    // Swap for a verified orabuego.com address once DNS is set up.
    from: "orabuego.com contact form <onboarding@resend.dev>",
    to: toEmail,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Couldn't send that — try again in a moment." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
