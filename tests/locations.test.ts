import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { getOpenStatus } from "../lib/hours.ts";
import { ALL_LOCATIONS, LOCATIONS, locationH1, validateLocations, type Location } from "../lib/locations.ts";

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

test("Celeste and Ocean keep their own names and stay unpublished with nulls", () => {
  const celeste = ALL_LOCATIONS.find((l) => l.slug === "celeste")!;
  const ocean = ALL_LOCATIONS.find((l) => l.slug === "ocean")!;
  assert.equal(celeste.gbpName, "Celeste Pharmacy");
  assert.equal(ocean.gbpName, "Ocean Pharmacy");
  for (const l of [celeste, ocean]) {
    assert.equal(l.isPublished, false);
    assert.equal(l.phone, null);
    assert.equal(l.hours, null);
  }
  assert.ok(!LOCATIONS.some((l) => l.brand !== "RMC"));
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
