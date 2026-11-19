import assert from "node:assert/strict";
import { test } from "node:test";
import { hotelContent } from "../lib/hotelContent.ts";
import { HOTELS, nearbyHotels } from "../lib/hotels.ts";
import { ZONES, getZone } from "../lib/zones.ts";

test("every hotel page belongs to a zone that lists it, and every listed hotel has a page", () => {
  const slugs = new Set<string>();
  for (const h of HOTELS) {
    const z = getZone(h.zone);
    assert.ok(z, `${h.slug} zone ${h.zone}`);
    assert.ok(z.hotels.includes(h.name), `${h.name} is not in ${h.zone}.hotels`);
    assert.ok(!slugs.has(h.slug), `duplicate slug ${h.slug}`);
    assert.match(h.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, h.slug);
    slugs.add(h.slug);
  }
  for (const z of ZONES) for (const name of z.hotels) {
    if (/^Private/i.test(name)) continue;
    assert.ok(HOTELS.some((h) => h.name === name && h.zone === z.slug), `${name} (${z.slug}) has no page`);
  }
});

test("coordinates and distances are inside Los Cabos and plausible", () => {
  for (const h of HOTELS) {
    if (h.geo) {
      assert.ok(h.geo.lat > 22.8 && h.geo.lat < 23.2, `${h.slug} lat`);
      assert.ok(h.geo.lng > -110.1 && h.geo.lng < -109.5, `${h.slug} lng`);
    }
    if (h.roadKm !== null) assert.ok(h.roadKm > 0 && h.roadKm < 60, `${h.slug} km`);
    assert.ok(nearbyHotels(h).length > 0, `${h.slug} nearby`);
  }
});

test("hotel pages keep the content rules and short titles", () => {
  for (const h of HOTELS) for (const lang of ["en", "es"] as const) {
    const c = hotelContent(h, getZone(h.zone)!, lang);
    const all = JSON.stringify(c);
    assert.doesNotMatch(all, /licen[sc]|licencia|permit|permiso|certif|cofepris|coepris|prescription|receta|antibio|24\/7|24 hours|24 horas/i, h.slug);
    assert.match(all, /stimad|stimated/i, h.slug);
    assert.ok(c.title.length <= 90, `${h.slug} ${lang} title is ${c.title.length} chars`);
    assert.ok(c.faqs.length >= 5);
    assert.ok(c.h1.includes(h.name));
  }
});
