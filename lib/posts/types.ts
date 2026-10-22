import type { Lang } from "../site";

export type Block = { h: string } | { p: string } | { ul: string[] };

export type Post = {
  slug: string;
  date: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  body: Record<Lang, Block[]>;
  /** Internal English paths shown as "related" links. */
  related: { path: string; label: Record<Lang, string> }[];
  faqs?: { q: Record<Lang, string>; a: Record<Lang, string> }[];
};
