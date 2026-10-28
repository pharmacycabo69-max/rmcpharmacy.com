import { post as firstAidKit } from "./cabo-travel-first-aid-kit";
import { post as delivery } from "./pharmacy-delivery-villa-hotel-cabo";
import { post as ivTherapy } from "./iv-therapy-cabo-guide";
import { post as heat } from "./heat-and-sun-safety-cabo";
import { post as stomach } from "./upset-stomach-on-vacation-cabo";
import { post as doctor } from "./see-a-doctor-in-cabo-on-vacation";
import { post as otc } from "./otc-mexico-vs-us-guide";
import { post as nurse } from "./nurse-at-your-villa-cabo";
import { post as medanoDelivery } from "./pharmacy-delivery-medano-beach-hotels";
import { post as sanJoseDelivery } from "./pharmacy-delivery-san-jose-del-cabo-corridor";
import { post as sunscreen } from "./sunscreen-guide-los-cabos";
import { post as boatDay } from "./boat-day-essentials-cabo-marina";
import { post as kids } from "./traveling-with-kids-pharmacy-checklist-cabo";
import { post as lobby } from "./how-hotel-lobby-delivery-works-cabo";
import type { Post } from "./types";

export type { Block, Post } from "./types";

export const POSTS: Post[] = [delivery, firstAidKit, ivTherapy, heat, stomach, doctor, otc, nurse, medanoDelivery, sanJoseDelivery, sunscreen, boatDay, kids, lobby];

/** A post goes live on its date (UTC). Pages revalidate hourly so each one appears without a redeploy. */
export function isPublished(post: Post, now = new Date()) {
  return post.date <= now.toISOString().slice(0, 10);
}

export function getPublishedPosts() {
  return POSTS.filter((p) => isPublished(p));
}

export function getPost(slug: string) {
  const post = POSTS.find((p) => p.slug === slug);
  return post && isPublished(post) ? post : undefined;
}
