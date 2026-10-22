import type { Lang } from "@/lib/site";

export function FaqList({ lang, items }: { lang: Lang; items: { q: Record<Lang, string>; a: Record<Lang, string> }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q.en}>
          <summary>{f.q[lang]}</summary>
          <p>{f.a[lang]}</p>
        </details>
      ))}
    </div>
  );
}
