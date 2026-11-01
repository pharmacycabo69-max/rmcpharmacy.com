import type { Lang } from "./site";

/**
 * Real Google reviews, copied from each store's Business Profile by hand.
 * Excerpts only, in the reviewer's own language, with a link back to the profile.
 * Keep them honest: never edit the wording, never invent names, no incentives.
 * Not emitted as AggregateRating/Review schema: Google ignores self-served LocalBusiness ratings
 * and we are not the source of these reviews.
 */
export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Approximate month as shown on Google (e.g. "2026-03"). */
  when: string;
  /** Review language. */
  lang: Lang;
  text: string;
};

export type StoreReviews = {
  /** Summary as shown on the profile the day it was copied. */
  ratingValue: number;
  reviewCount: number;
  asOf: string;
  items: Review[];
};

export const REVIEWS: Record<string, StoreReviews> = {
  "plaza-embarcadero": {
    ratingValue: 4.8,
    reviewCount: 49,
    asOf: "2026-11-01",
    items: [
      {
        author: "Eryn W.",
        rating: 5,
        when: "2026-03",
        lang: "en",
        text: "From start to finish, the entire experience was exceptional. The service was incredibly timely and convenient, which made everything so easy and stress-free. The staff were beyond professional. They were kind, attentive, and genuinely caring. Every question was answered clearly, and I never once felt rushed.",
      },
      {
        author: "Alejandra M.",
        rating: 5,
        when: "2025-12",
        lang: "en",
        text: "I wasn't feeling well during my trip, and a friend recommended them. I messaged their team and they replied right away — super kind, patient, and willing to explain everything. The prices were fair. They even offered delivery to my hotel, and it arrived faster than I expected.",
      },
      {
        author: "Gael M.",
        rating: 5,
        when: "2025-10",
        lang: "en",
        text: "They delivered straight to my hotel in less than an hour. The team was professional, polite. Communication in English was super easy, and payment in USD or card was no problem. Perfect for tourists staying in hotels or villas who need quick and private assistance.",
      },
    ],
  },
};

export function getReviews(slug: string): StoreReviews | null {
  return REVIEWS[slug] ?? null;
}
