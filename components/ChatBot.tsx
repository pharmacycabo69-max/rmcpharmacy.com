"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChatIcon, WhatsAppGlyph } from "./Icons";
import type { BotConfig, BotTopic } from "@/lib/botFlows";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

function track(event: string, extra: Record<string, unknown> = {}) {
  const w = window as DataLayerWindow;
  (w.dataLayer = w.dataLayer ?? []).push({ event, page_path: window.location.pathname, ...extra });
}

// Preloaded answers only (no free text, no server calls). Every path ends on WhatsApp.
export function ChatBot({ config }: { config: BotConfig }) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<BotTopic | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [topic, open]);

  const { ui } = config;

  return (
    <>
      {open && (
        <section className="bot" role="dialog" aria-label={`${ui.title} · ${ui.subtitle}`}>
          <header className="bot-head">
            <div>
              <strong>{ui.title}</strong>
              <span>{ui.subtitle}</span>
            </div>
            <button ref={closeRef} className="bot-close" onClick={() => { setOpen(false); launcherRef.current?.focus(); }} aria-label={ui.close}>
              ×
            </button>
          </header>

          <div className="bot-body" ref={bodyRef} aria-live="polite">
            <p className="bubble bot-bubble">{config.greeting}</p>
            <p className="bubble bot-bubble">{config.pickTopic}</p>

            {topic && (
              <>
                <p className="bubble user-bubble">{topic.label}</p>
                <div className="bubble bot-bubble">
                  {topic.answer.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                {topic.link && (
                  <Link className="bot-link" href={topic.link.href} onClick={() => setOpen(false)}>
                    {topic.link.label}
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="bot-foot">
            {topic && (
              <a className="btn btn-primary bot-cta" href={topic.waUrl} target="_blank" rel="noopener" data-cta="whatsapp" data-source={`bot-${topic.id}`}>
                <WhatsAppGlyph /> {ui.toWhatsApp}
              </a>
            )}
            <div className="bot-chips">
              {config.topics
                .filter((t) => t.id !== topic?.id)
                .map((t) => (
                  <button
                    key={t.id}
                    className="chip-btn"
                    onClick={() => {
                      setTopic(t);
                      track("bot_topic", { bot_topic: t.id });
                    }}
                  >
                    {t.label}
                  </button>
                ))}
            </div>
            <a className="bot-person" href={config.directUrl} target="_blank" rel="noopener" data-cta="whatsapp" data-source="bot-direct">
              {ui.talkToPerson}
            </a>
            <small>{ui.notice}</small>
          </div>
        </section>
      )}

      <button
        ref={launcherRef}
        className="bot-launcher"
        aria-expanded={open}
        aria-label={ui.launcher}
        onClick={() => {
          setOpen((o) => !o);
          if (!open) track("bot_open");
        }}
      >
        <ChatIcon />
        <span className="bot-launcher-label">{ui.launcher}</span>
      </button>
    </>
  );
}
