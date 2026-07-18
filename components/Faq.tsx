"use client";

import { useState } from "react";

const items = [
  ["Do you offer free estimates?", "Yes. Every quote is free and clear from the start, with no pressure and no surprise charges."],
  ["Do you do single visits or recurring service?", "Both. We offer recurring lawn care as well as single visit cleanups, clearing, and detailing."],
  ["Do you haul debris away?", "Yes. For cleanup and clearing work, we haul material off so you are not left with a pile."],
  ["Do you work with businesses and rentals?", "Absolutely. We serve homes, rentals, commercial properties, and land."],
  ["How do I get started?", "Send the quote form with your address, the service you need, and a few details. We’ll take it from there."],
] as const;

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-list">
      {items.map(([question, answer], index) => (
        <div className="faq-item" key={question}>
          <button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
            <span>{question}</span>
            <span className={open === index ? "faq-plus open" : "faq-plus"}>+</span>
          </button>
          {open === index && <p>{answer}</p>}
        </div>
      ))}
    </div>
  );
}
