import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const quoteToEmail = process.env.QUOTE_TO_EMAIL;
  const fromEmail = process.env.QUOTE_FROM_EMAIL || "CLM Website <onboarding@resend.dev>";

  if (!resendApiKey || !quoteToEmail) {
    return NextResponse.json({ error: "Quote email is not configured." }, { status: 503 });
  }

  const body = await request.json();
  if (!body.name || !body.phone || !body.address) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const details = [
    `Name: ${body.name}`,
    `Phone: ${body.phone}`,
    `Email: ${body.email || "Not provided"}`,
    `Address: ${body.address}`,
    `Property type: ${body.propertyType || "Not provided"}`,
    `Services: ${Array.isArray(body.services) ? body.services.join(", ") : "Not provided"}`,
    "",
    body.message || "No additional details.",
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: fromEmail, to: [quoteToEmail], subject: `New CLM quote request from ${body.name}`, text: details }),
  });

  if (!response.ok) return NextResponse.json({ error: "Unable to send quote." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
