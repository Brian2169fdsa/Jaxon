import { NextResponse } from "next/server";

const allowedServices = new Set(["Lawn Mowing", "Garden Beds", "Yard Cleanup", "Brush Clearing", "Auto/Truck Detailing", "Something Else"]);
const allowedPropertyTypes = new Set(["Residential", "Commercial"]);

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  })[character] || character);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  if (clean(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 100);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 200);
  const address = clean(body.address, 240);
  const message = clean(body.message, 2000);
  const propertyType = allowedPropertyTypes.has(clean(body.propertyType, 40)) ? clean(body.propertyType, 40) : "";
  const services = Array.isArray(body.services)
    ? body.services.map((service) => clean(service, 80)).filter((service) => allowedServices.has(service))
    : [];

  if (!name || phone.length < 7 || !address || !propertyType || !services.length) {
    return NextResponse.json({ error: "Please complete every required field and choose at least one service." }, { status: 400 });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const quoteToEmail = process.env.QUOTE_TO_EMAIL || "jaxoncombs2@gmail.com";
  const fromEmail = process.env.QUOTE_FROM_EMAIL || "Combs Land Management <quotes@combslandmgt.com>";

  if (!resendApiKey) {
    return NextResponse.json({ error: "Online quotes are temporarily unavailable. Please call or email us directly." }, { status: 503 });
  }

  const requestId = crypto.randomUUID();
  const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/Chicago", dateStyle: "medium", timeStyle: "short" });
  const details = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || "Not provided"}`,
    `Address: ${address}`,
    `Property type: ${propertyType}`,
    `Services: ${services.join(", ")}`,
    `Submitted: ${submittedAt} CT`,
    `Request ID: ${requestId}`,
    "",
    message || "No additional details.",
  ].join("\n");

  const safe = {
    name: escapeHtml(name),
    phone: escapeHtml(phone),
    email: escapeHtml(email || "Not provided"),
    address: escapeHtml(address),
    propertyType: escapeHtml(propertyType),
    services: escapeHtml(services.join(", ")),
    message: escapeHtml(message || "No additional details.").replace(/\n/g, "<br />"),
    submittedAt: escapeHtml(submittedAt),
    requestId: escapeHtml(requestId),
  };

  let response: Response;

  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": requestId,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [quoteToEmail],
        reply_to: email || undefined,
        subject: `New CLM quote request from ${name}`,
        text: details,
        html: `
          <div style="background:#f3f7fc;padding:32px 16px;font-family:Arial,sans-serif;color:#172131">
            <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dbe5f1;border-radius:18px;overflow:hidden">
              <div style="padding:26px 30px;background:#075bbd;color:#ffffff">
                <div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.8">New website lead</div>
                <h1 style="margin:8px 0 0;font-size:26px">Quote request from ${safe.name}</h1>
              </div>
              <div style="padding:28px 30px">
                <table style="width:100%;border-collapse:collapse;font-size:15px">
                  <tr><td style="padding:9px 0;color:#6d788a;width:145px">Phone</td><td style="padding:9px 0;font-weight:700">${safe.phone}</td></tr>
                  <tr><td style="padding:9px 0;color:#6d788a">Email</td><td style="padding:9px 0;font-weight:700">${safe.email}</td></tr>
                  <tr><td style="padding:9px 0;color:#6d788a">Property</td><td style="padding:9px 0;font-weight:700">${safe.address}</td></tr>
                  <tr><td style="padding:9px 0;color:#6d788a">Type</td><td style="padding:9px 0">${safe.propertyType}</td></tr>
                  <tr><td style="padding:9px 0;color:#6d788a">Services</td><td style="padding:9px 0">${safe.services}</td></tr>
                </table>
                <div style="margin-top:22px;padding:20px;border-radius:12px;background:#f3f7fc;line-height:1.65">${safe.message}</div>
                <p style="margin:22px 0 0;color:#6d788a;font-size:12px">Submitted ${safe.submittedAt} CT · Request ${safe.requestId}</p>
              </div>
            </div>
          </div>
        `,
      }),
      signal: AbortSignal.timeout(12000),
    });
  } catch {
    return NextResponse.json({ error: "We could not send your request. Please try again or contact us directly." }, { status: 502 });
  }

  if (!response.ok) {
    const providerError = await response.text();
    console.error("Resend quote delivery failed", response.status, providerError);
    return NextResponse.json({ error: "We could not send your request. Please try again or contact us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, requestId });
}
