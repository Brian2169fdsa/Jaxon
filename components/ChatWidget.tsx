"use client";

import Link from "next/link";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };

const welcome: ChatMessage = {
  role: "assistant",
  content: "Hi! I’m the CLM property assistant. Ask me about services, service areas, what a job includes, or the best way to request a quote.",
};

const suggestions = ["Which service fits my property?", "Do you serve my town?", "What should I include in a quote request?"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  async function sendMessage(content: string) {
    const cleanContent = content.trim();
    if (!cleanContent || sending) return;
    const userMessage: ChatMessage = { role: "user", content: cleanContent };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(1).slice(-10) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The assistant is unavailable.");
      setMessages((current) => [...current, { role: "assistant", content: data.message }]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: error instanceof Error ? error.message : "I’m unavailable right now. Please use the quote form and the crew will follow up.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  }

  return (
    <div className={open ? "chat-widget open" : "chat-widget"}>
      {open && (
        <section className="chat-panel" aria-label="Chat with the CLM property assistant">
          <header className="chat-header">
            <div className="chat-avatar">CLM</div>
            <div><strong>Property Assistant</strong><span><i /> Powered by Claude</span></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </header>
          <div className="chat-messages" ref={scrollRef} aria-live="polite">
            {messages.map((message, index) => <p className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>{message.content}</p>)}
            {messages.length === 1 && <div className="chat-suggestions">{suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => void sendMessage(suggestion)}>{suggestion}</button>)}</div>}
            {sending && <p className="chat-message assistant typing"><span /><span /><span /></p>}
          </div>
          <form className="chat-form" onSubmit={submit}>
            <textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} maxLength={1200} rows={1} placeholder="Ask about your property…" aria-label="Message" />
            <button type="submit" disabled={!input.trim() || sending} aria-label="Send message">→</button>
          </form>
          <p className="chat-disclaimer">For exact pricing and scheduling, <Link href="/contact">request a free quote</Link>.</p>
        </section>
      )}
      <button className="chat-launcher" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close property assistant" : "Open property assistant"} aria-expanded={open}>
        {open ? <span>×</span> : <><span className="chat-spark">✦</span><strong>Ask CLM</strong></>}
      </button>
    </div>
  );
}
