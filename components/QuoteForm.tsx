"use client";

import { FormEvent, useState } from "react";

const serviceOptions = ["Lawn Mowing", "Garden Beds", "Yard Cleanup", "Brush Clearing", "Auto/Truck Detailing", "Something Else"];

export function QuoteForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [type, setType] = useState("Residential");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, services: selected, propertyType: type }),
      });
      if (!response.ok) throw new Error("Unable to send");
      setStatus("sent");
      event.currentTarget.reset();
      setSelected([]);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <div className="form-success"><span>✓</span><h2>Quote request received.</h2><p>Thanks for reaching out. We’ll review the property details and get back to you shortly.</p><button className="button button-primary" onClick={() => setStatus("idle")}>Submit another request</button></div>;
  }

  return (
    <form className="quote-form" onSubmit={submit}>
      <div className="form-grid">
        <label><span>Name *</span><input name="name" required autoComplete="name" /></label>
        <label><span>Phone *</span><input name="phone" required autoComplete="tel" inputMode="tel" /></label>
        <label><span>Email</span><input name="email" type="email" autoComplete="email" /></label>
        <label><span>Property address / city *</span><input name="address" required autoComplete="street-address" /></label>
      </div>
      <fieldset><legend>What can we help with?</legend><div className="chip-list">{serviceOptions.map((option) => <button key={option} type="button" className={selected.includes(option) ? "chip selected" : "chip"} onClick={() => setSelected((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option])}>{option}</button>)}</div></fieldset>
      <fieldset><legend>Property type</legend><div className="segment-control">{["Residential", "Commercial"].map((option) => <button key={option} type="button" className={type === option ? "selected" : ""} onClick={() => setType(option)}>{option}</button>)}</div></fieldset>
      <label><span>Tell us about the property</span><textarea name="message" rows={6} placeholder="What needs done? Property size, timing, access notes, or anything else that helps." /></label>
      <button className="button button-primary form-submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send My Quote Request"}</button>
      {status === "error" && <p className="form-error">The form is not connected yet. Please call us while the email connection is being finished.</p>}
    </form>
  );
}
