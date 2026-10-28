import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { getOpenStatus } from "../lib/hours.ts";
import { ALL_LOCATIONS, LOCATIONS, locationH1, validateLocations, type Location } from "../lib/locations.ts";
import { buildBot } from "../lib/botFlows.ts";
import { IV_PRODUCTS } from "../lib/ivProducts.ts";
import { TEAM_PHOTOS } from "../lib/team.ts";
import { zoneContent } from "../lib/zoneContent.ts";
import { ZONES } from "../lib/zones.ts";
import { IV_SESSION_PHOTOS } from "../lib/sessionPhotos.ts";

const published = ALL_LOCATIONS.filter((l) => l.isPublished);

test("H1 equals the exact GBP name for every published store", () => {
  assert.ok(published.length > 0);
  for (const l of published) {
    assert.equal(locationH1(l), l.gbpName, l.slug);
    assert.doesNotMatch(l.gbpName, /cabo|delivery|24/i, `${l.slug} name has keywords`);
  }
});

test("confirmed addresses are used verbatim and Embarcadero is flagged for review", () => {
  const by = (s: string) => ALL_LOCATIONS.find((l) => l.slug === s)!;
  assert.equal(by("plaza-gali").addressLine, "Plaza Gali, Blvd. Paseo de la Marina, Loc 47");
  assert.equal(by("mercado-marina").addressLine, "Mercado Marina 11");
  assert.equal(by("celeste").addressLine, "Blvd. Lázaro Cárdenas, Dep 17");
  assert.equal(by("ocean").addressLine, "Blvd. Paseo de la Marina 103, Andador Módulo 103");
  assert.equal(by("plaza-embarcadero").needsReview, true);
  assert.ok(published.every((l) => l.phone === "+52 624 226 1023"));
});

test("Celeste and Ocean are published under their own names, never renamed to RMC", () => {
  for (const slug of ["celeste", "ocean"]) {
    const l = ALL_LOCATIONS.find((x) => x.slug === slug)!;
    assert.equal(l.isPublished, true);
    assert.ok(!/rmc/i.test(l.gbpName));
    assert.ok(LOCATIONS.some((x) => x.slug === slug));
  }
  assert.equal(ALL_LOCATIONS.find((l) => l.slug === "celeste")!.gbpName, "Celeste Pharmacy");
  assert.equal(ALL_LOCATIONS.find((l) => l.slug === "ocean")!.gbpName, "Ocean Pharmacy");
});

test("a published store with null phone, hours or address fails validation with a clear message", () => {
  for (const field of ["phone", "hours", "addressLine"] as const) {
    const bad: Location = { ...published[0], [field]: null } as Location;
    assert.throws(() => validateLocations([bad]), new RegExp(`${published[0].slug}.*${field}`));
  }
  assert.doesNotThrow(() => validateLocations([{ ...published[0], isPublished: false, phone: null }]));
});

test("every published store has 2+ FAQs and a 150-250 word intro in both languages", () => {
  for (const l of published) {
    assert.ok(l.faq.length >= 2, `${l.slug} faq`);
    for (const lang of ["en", "es"] as const) {
      const words = l.intro![lang].trim().split(/\s+/).length;
      assert.ok(words >= 150 && words <= 250, `${l.slug} ${lang} intro has ${words} words`);
    }
  }
});

test("no regulatory words, prescription claims or stale store counts in store data", () => {
  const text = JSON.stringify(ALL_LOCATIONS);
  assert.doesNotMatch(text, /licen[sc]|licencia|permit|permiso|certif|cofepris|coepris|prescription|receta/i);
  assert.doesNotMatch(readFileSync("app/[lang]/(main)/about/page.tsx", "utf8"), /three stores|tres sucursales/i);
});

test("no hardcoded store counts anywhere in app, components or lib", () => {
  const offenders: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.(ts|tsx)$/.test(name) && !path.endsWith("lib/locations.ts")) {
        if (/three (RMC |stores|locations)|tres sucursales|our three/i.test(readFileSync(path, "utf8"))) offenders.push(path);
      }
    }
  };
  for (const d of ["app", "components", "lib"]) walk(d);
  assert.deepEqual(offenders, []);
});

test("open/closed uses America/Mazatlan time", () => {
  const hours = published[0].hours!;
  // 2026-10-28 16:00 UTC = 10:00 in Mazatlan (UTC-7): open. 02:00 UTC = 19:00 previous day: closed.
  assert.equal(getOpenStatus(hours, new Date("2026-10-28T16:00:00Z")).open, true);
  assert.equal(getOpenStatus(hours, new Date("2026-10-29T02:00:00Z")).open, false);
});

test("published stores with photos use files that exist, are small, and have neutral alt text in both languages", () => {
  for (const l of published) {
    for (const ph of l.photos) {
      const path = join("public", ph.src);
      assert.ok(statSync(path).size < 400 * 1024, `${path} is larger than 400KB`);
      for (const lang of ["en", "es"] as const) {
        assert.ok(ph.alt[lang].length > 10, `${path} alt ${lang}`);
        assert.doesNotMatch(ph.alt[lang], /licen[sc]|licencia|permit|permiso|certif|cofepris|prescription|receta|antibio|viagra/i, `${path} alt`);
      }
    }
  }
});

test("every published store has a Google review short link", () => {
  for (const l of published) assert.match(l.reviewUrl ?? "", /^https:\/\/g\.page\/r\/[\w-]+\/review$/, l.slug);
});

test("the clinic is not part of this site", () => {
  const all = JSON.stringify(ALL_LOCATIONS);
  assert.doesNotMatch(all, /walk-in|cabo-walk-in|CdOKsP6bcFvgEAI/i);
  assert.ok(!ALL_LOCATIONS.some((l) => l.slug === "cabo-walk-in-clinic"));
});

test("session photos exist and are small", () => {
  for (const ph of IV_SESSION_PHOTOS) {
    assert.ok(statSync(join("public", ph.src)).size < 400 * 1024, ph.src);
    assert.ok(ph.alt.en.length > 10 && ph.alt.es.length > 10);
  }
});

test("IV products list prices consistent with the minimums and no drug names or claims", () => {
  assert.equal(Math.min(...IV_PRODUCTS.map((p) => p.home)), 159);
  assert.equal(Math.min(...IV_PRODUCTS.map((p) => p.office)), 129);
  assert.doesNotMatch(JSON.stringify(IV_PRODUCTS), /ondans|omepra|licen[sc]|certif|detox|hangover|cure|medical-grade/i);
});

test("bot answers: every topic ends on WhatsApp, in both languages, with no regulatory or drug wording", () => {
  for (const lang of ["en", "es"] as const) {
    const bot = buildBot(lang);
    assert.ok(bot.topics.length >= 5);
    assert.match(bot.directUrl, /^https:\/\/wa\.me\/526242261023\?text=/);
    for (const topic of bot.topics) {
      assert.match(topic.waUrl, /^https:\/\/wa\.me\/526242261023\?text=.*bot-/, topic.id);
      assert.ok(topic.answer.length >= 1 && topic.label.length > 2);
    }
    const all = JSON.stringify(bot);
    assert.doesNotMatch(all, /licen[sc]|licencia|permit|permiso|certif|cofepris|coepris|prescription|receta|antibio|viagra|ondans|omepra|detox|hangover/i);
    // the stores answer lists every published store, never a hardcoded count
    const stores = bot.topics.find((x) => x.id === "stores")!.answer.join(" ");
    for (const l of LOCATIONS) assert.ok(stores.includes(l.addressLine), l.slug);
  }
});

test("bot prices match the service pages", () => {
  const en = JSON.stringify(buildBot("en"));
  assert.ok(en.includes("$59") && en.includes("$99") && en.includes("$200") && en.includes("$139"));
  const services = readFileSync("lib/services.ts", "utf8");
  for (const price of ["$59", "$99", "$200"]) assert.ok(services.includes(price), price);
  assert.ok(readFileSync("lib/groups.ts", "utf8").includes("$139"));
});

test("13 delivery zones with the agreed estimated ranges and 300+ words of page text per language", () => {
  const agreed: Record<string, [number, number]> = {
    "marina-centro": [15, 25], medano: [15, 25], pedregal: [20, 30], "pacifico-sunset": [20, 35], "diamante-quivira": [25, 40],
    "cabo-bello-misiones": [20, 35], "corredor-chileno": [30, 45], "cabo-del-sol": [30, 45], palmilla: [40, 55], "costa-azul": [45, 60],
    "zona-hotelera-san-jose": [50, 65], "centro-san-jose": [50, 65], "puerto-los-cabos": [55, 70],
  };
  assert.equal(ZONES.length, 13);
  for (const z of ZONES) {
    assert.deepEqual([z.etaMin, z.etaMax], agreed[z.slug], z.slug);
    assert.ok(z.hotels.length >= 1);
    for (const lang of ["en", "es"] as const) {
      const c = zoneContent(z, lang);
      assert.ok(c.words >= 300, `${z.slug} ${lang} has ${c.words} words`);
      assert.ok(c.faqs.length >= 4);
      assert.match(c.title, /\d+–\d+ min/);
      // delivery times are always estimates, and 70 minutes is the maximum
      assert.ok(z.etaMax <= 70);
      assert.match(JSON.stringify(c), /stimad|stimated/i);
    }
  }
  assert.equal(Math.max(...ZONES.map((z) => z.etaMax)), 70);
});

test("zone pages never use regulatory or prescription wording and never promise delivery to the room", () => {
  for (const z of ZONES) for (const lang of ["en", "es"] as const) {
    const all = JSON.stringify(zoneContent(z, lang)) + JSON.stringify(z);
    assert.doesNotMatch(all, /licen[sc]|licencia|permit|permiso|certif|cofepris|coepris|prescription|receta|antibio|viagra|24\/7|24 hours|24 horas/i, z.slug);
  }
});

test("team and zone photos exist and are small", () => {
  for (const ph of TEAM_PHOTOS) {
    assert.ok(statSync(join("public", ph.src)).size < 400 * 1024, ph.src);
    assert.ok(ph.alt.en.length > 10 && ph.alt.es.length > 10);
  }
  for (const z of ZONES) if (z.photo) assert.ok(statSync(join("public", z.photo.src)).size < 400 * 1024, z.slug);
});
