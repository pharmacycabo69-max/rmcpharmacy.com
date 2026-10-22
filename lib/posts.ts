import type { Lang } from "./site";

export type Post = {
  slug: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  date: string;
  body: Record<Lang, string[]>;
};

// Articles are added in Phase 3 (editorial plan in docs/).
export const POSTS: Post[] = [];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
