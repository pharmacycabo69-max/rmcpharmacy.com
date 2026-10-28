"use client";

import { useEffect, useState } from "react";
import { DAY_LABEL, formatTime, getOpenStatus, type Hours } from "@/lib/hours";
import type { Lang } from "@/lib/site";

// Computed on the client (America/Mazatlan) so statically generated pages never show a stale state.
export function OpenStatus({ hours, lang }: { hours: Hours; lang: Lang }) {
  const [text, setText] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    const update = () => {
      const s = getOpenStatus(hours);
      if (s.open) {
        setText({ open: true, label: lang === "en" ? `Open now · closes ${formatTime(s.closesAt)}` : `Abierto ahora · cierra ${formatTime(s.closesAt)}` });
      } else if (s.opensAt) {
        const when = "today" in s && !s.today ? `${DAY_LABEL[s.day][lang]} ` : "";
        setText({
          open: false,
          label: lang === "en" ? `Closed now · opens ${when}${formatTime(s.opensAt)}` : `Cerrado ahora · abre ${when}${formatTime(s.opensAt)}`,
        });
      } else {
        setText({ open: false, label: lang === "en" ? "Closed" : "Cerrado" });
      }
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [hours, lang]);

  return (
    <span className={text?.open ? "status status-open" : "status"} aria-live="polite">
      {text?.label ?? " "}
    </span>
  );
}
