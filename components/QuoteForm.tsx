"use client";

import { FormEvent, useState } from "react";

const serviceOptions = ["Lawn Mowing", "Garden Beds", "Yard Cleanup", "Brush Clearing", "Auto/Truck Detailing", "Something Else"];

export function QuoteForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [type, setType] = useState("Residential");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected.length) {
      setErrorMessage("Choose at least one service so we know how to help.");
      setStatus("error");
      return;
    }

    const formElement = event.currentTarget;
    setStatus("sending");
    setErrorMessage("");
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, services: selected, propertyType: type }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "We could not send your request. Please try again.");
      setStatus("sent");
      formElement.reset();
      setSelected([]);
      setType("Residential");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We could not send your request. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <div className="form-success" role="status"><span>✓</span><h2>Quote request received.</h2><p>Thanks for reaching out. We’ll review the property details and get back to you shortly.</p><button className="button button-primary" onClick={() => setStatus("idle")}>Submit another request</button></div>;
  }

  return (
    <form className="quote-form" onSubmit={submit}>
      <div className="form-grid">
        <label><span>Name *</span><input name="name" required maxLength={100} autoComplete="name" /></label>
        <label><span>Phone *</span><input name="phone" required maxLength={40} minLength={7} autoComplete="tel" inputMode="tel" /></label>
        <label><span>Email</span><input name="email" type="email" maxLength={200} autoComplete="email" /></label>
        <label><span>Property address / city *</span><input name="address" required maxLength={240} autoComplete="street-address" /></label>
      </div>
      <fieldset><legend>What can we help with? *</legend><div className="chip-list">{serviceOptions.map((option) => <button key={option} type="button" aria-pressed={selected.includes(option)} className={selected.includes(option) ? "chip selected" : "chip"} onClick={() => { setSelected((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option]); setStatus("idle"); setErrorMessage(""); }}>{option}</button>)}</div></fieldset>
      <fieldset><legend>Property type</legend><div className="segment-control">{["Residential", "Commercial"].map((option) => <button key={option} type="button" className={type === option ? "selected" : ""} onClick={() => setType(option)}>{option}</button>)}</div></fieldset>
      <label><span>Tell us about the property</span><textarea name="message" rows={6} maxLength={2000} placeholder="What needs done? Property size, timing, access notes, or anything else that helps." /></label>
      <label className="form-honeypot" aria-hidden="true"><span>Company</span><input name="company" tabIndex={-1} autoComplete="off" /></label>
      <button className="button button-primary form-submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send My Quote Request"}</button>
      <p className="form-note">Your details are only used to respond to this quote request.</p>
      <div aria-live="polite">
        {status === "error" && <p className="form-error" role="alert">{errorMessage}</p>}
      </div>
    </form>
  );
}
