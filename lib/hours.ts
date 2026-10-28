// Pure helpers (no runtime imports) so they can run under `node --test` as well as in Next.
export const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;
export type Day = (typeof DAYS)[number];
type Lang = "en" | "es";

/** null means closed that day. Times are "HH:MM" in 24h, local to America/Mazatlan. */
export type DayHours = { opens: string; closes: string } | null;
export type Hours = Record<Day, DayHours>;

export const TIME_ZONE = "America/Mazatlan";

export const DAY_LABEL: Record<Day, Record<Lang, string>> = {
  monday: { en: "Monday", es: "Lunes" },
  tuesday: { en: "Tuesday", es: "Martes" },
  wednesday: { en: "Wednesday", es: "Miércoles" },
  thursday: { en: "Thursday", es: "Jueves" },
  friday: { en: "Friday", es: "Viernes" },
  saturday: { en: "Saturday", es: "Sábado" },
  sunday: { en: "Sunday", es: "Domingo" },
};

export function everyDay(opens: string, closes: string): Hours {
  const h = { opens, closes };
  return { monday: h, tuesday: h, wednesday: h, thursday: h, friday: h, saturday: h, sunday: h };
}

/** "09:00" -> "9 am", "18:30" -> "6:30 pm". */
export function formatTime(time: string) {
  const [hh, mm] = time.split(":").map(Number);
  const suffix = hh >= 12 ? "pm" : "am";
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return mm ? `${h12}:${String(mm).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
}

export function formatRange(d: DayHours, lang: Lang) {
  if (!d) return lang === "en" ? "Closed" : "Cerrado";
  return `${formatTime(d.opens)} – ${formatTime(d.closes)}`;
}

/** "Every day, 9 am to 6 pm" when all days match, otherwise a neutral pointer to the hours list. */
export function hoursSummary(hours: Hours, lang: Lang) {
  const first = hours.monday;
  const same = DAYS.every((d) => JSON.stringify(hours[d]) === JSON.stringify(first));
  if (same && first) {
    return lang === "en"
      ? `Every day, ${formatTime(first.opens)} to ${formatTime(first.closes)}`
      : `Todos los días, ${formatTime(first.opens)} a ${formatTime(first.closes)}`;
  }
  return lang === "en" ? "See opening hours" : "Ver horarios";
}

const WEEKDAY_INDEX: Record<string, number> = { Monday: 0, Tuesday: 1, Wednesday: 2, Thursday: 3, Friday: 4, Saturday: 5, Sunday: 6 };

function zonedNow(now: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { day: WEEKDAY_INDEX[get("weekday")], minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export type OpenStatus =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string; day: Day; today: boolean }
  | { open: false; opensAt: null };

export function getOpenStatus(hours: Hours, now: Date = new Date(), timeZone: string = TIME_ZONE): OpenStatus {
  const { day, minutes } = zonedNow(now, timeZone);
  const today = hours[DAYS[day]];
  if (today && minutes >= toMinutes(today.opens) && minutes < toMinutes(today.closes)) {
    return { open: true, closesAt: today.closes };
  }
  for (let offset = 0; offset < 7; offset++) {
    const d = DAYS[(day + offset) % 7];
    const h = hours[d];
    if (!h) continue;
    if (offset === 0 && minutes >= toMinutes(h.opens)) continue; // already past today's opening
    return { open: false, opensAt: h.opens, day: d, today: offset === 0 };
  }
  return { open: false, opensAt: null };
}
