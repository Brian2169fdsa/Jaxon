import { NextResponse } from "next/server";
import { business, reviews, services, towns } from "@/lib/site-data";

export const maxDuration = 30;

type ChatMessage = { role: "user" | "assistant"; content: string };

const siteContext = `
BUSINESS
Name: ${business.name}
Tagline: ${business.tagline}
Phone: ${business.phone}
Email: ${business.email}
Location: ${business.location}
Hours: ${business.hours}
Service towns: ${towns.join(", ")}

SERVICES
${services.map((service) => `${service.title}: ${service.description} Included: ${service.included.join("; ")}`).join("\n")}

CUSTOMER THEMES
${reviews.slice(0, 3).map(([quote, , town]) => `${town}: ${quote}`).join("\n")}
`;

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL;
  if (!apiKey || !model) {
    return NextResponse.json({ error: "The assistant is not connected yet. Please use the free quote form for now." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const incoming: unknown[] = Array.isArray(body?.messages) ? body.messages : [];
  const messages: ChatMessage[] = incoming
    .filter((message: unknown): message is ChatMessage => {
      if (!message || typeof message !== "object") return false;
      const candidate = message as ChatMessage;
      return (candidate.role === "user" || candidate.role === "assistant") && typeof candidate.content === "string";
    })
    .slice(-10)
    .map((message) => ({ role: message.role, content: message.content.slice(0, 1500) }));

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Please send a message." }, { status: 400 });
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 500,
      temperature: 0.25,
      system: `You are the website assistant for Combs Land Management. Answer using only the site context below. Be concise, friendly, practical, and local. Help visitors choose a service and prepare a useful quote request. Never invent prices, exact availability, insurance details, guarantees, addresses, or service areas that are not in the context. Never claim a booking is confirmed. When a visitor needs pricing, scheduling, or a recommendation for a specific property, direct them to the free quote form or phone number. If the answer is not in the context, say the crew can confirm it. Do not use hyphens, en dashes, or em dashes in any response.\n\n${siteContext}`,
      messages,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return NextResponse.json({ error: "The assistant is temporarily unavailable. Please try again or request a quote." }, { status: 502 });
  }

  const message = Array.isArray(data.content)
    ? data.content.filter((block: { type?: string; text?: string }) => block.type === "text").map((block: { text: string }) => block.text).join("\n")
    : "";

  if (!message) return NextResponse.json({ error: "The assistant did not return a response." }, { status: 502 });
  const cleanedMessage = message.replace(/[\u002d\u2013\u2014]/g, " ").replace(/ {2,}/g, " ");
  return NextResponse.json({ message: cleanedMessage });
}
