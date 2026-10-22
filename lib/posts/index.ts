import { post as firstAidKit } from "./cabo-travel-first-aid-kit";
import { post as delivery } from "./pharmacy-delivery-villa-hotel-cabo";
import { post as ivTherapy } from "./iv-therapy-cabo-guide";
import { post as heat } from "./heat-and-sun-safety-cabo";
import { post as stomach } from "./upset-stomach-on-vacation-cabo";
import { post as doctor } from "./see-a-doctor-in-cabo-on-vacation";
import { post as otc } from "./otc-mexico-vs-us-guide";
import { post as nurse } from "./nurse-at-your-villa-cabo";
import type { Post } from "./types";

export type { Block, Post } from "./types";

export const POSTS: Post[] = [delivery, firstAidKit, ivTherapy, heat, stomach, doctor, otc, nurse];

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
