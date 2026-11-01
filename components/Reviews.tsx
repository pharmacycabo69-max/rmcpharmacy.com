import type { StoreReviews } from "@/lib/reviews";
import type { Lang } from "@/lib/site";

const MONTH: Record<Lang, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
};

function monthLabel(when: string, lang: Lang) {
  const [y, m] = when.split("-").map(Number);
  return `${MONTH[lang][(m || 1) - 1]} ${y}`;
}

function Stars({ n }: { n: number }) {
  return (
    <span className="stars" aria-label={`${n}/5`}>
      {"★★★★★".slice(0, n)}
      <span className="stars-off">{"★★★★★".slice(n)}</span>
    </span>
  );
}

type Props = { lang: Lang; reviews: StoreReviews | null; mapsUrl: string | null; reviewUrl: string | null; storeName: string };

/** Real Google reviews for a store, or an invitation to leave the first one. */
export function Reviews({ lang, reviews, mapsUrl, reviewUrl, storeName }: Props) {
  const en = lang === "en";
  if (!reviews || reviews.items.length === 0) {
    if (!reviewUrl) return null;
    return (
      <section className="section reviews">
        <h2>{en ? "Reviews" : "Reseñas"}</h2>
        <p className="muted">
          {en
            ? `Been to ${storeName}? A short Google review helps other travelers find us.`
            : `¿Ya visitaste ${storeName}? Una reseña corta en Google ayuda a otros viajeros a encontrarnos.`}
        </p>
        <a className="btn btn-secondary" href={reviewUrl} target="_blank" rel="noopener" data-cta="review" data-source="branch-reviews">
          {en ? "Leave a review on Google" : "Deja una reseña en Google"}
        </a>
      </section>
    );
  }
  return (
    <section className="section reviews">
      <div className="reviews-head">
        <h2>{en ? "What guests say" : "Lo que dicen los clientes"}</h2>
        <p className="reviews-summary">
          <strong>{reviews.ratingValue.toFixed(1)}</strong> <Stars n={Math.round(reviews.ratingValue)} />{" "}
          <span className="muted">
            {en ? `${reviews.reviewCount} Google reviews` : `${reviews.reviewCount} reseñas en Google`}
          </span>
        </p>
      </div>
      <ul className="review-grid">
        {reviews.items.map((r) => (
          <li key={r.author + r.when} className="review-card">
            <Stars n={r.rating} />
            <blockquote lang={r.lang}>
              <p>{r.text}</p>
            </blockquote>
            <footer>
              <strong>{r.author}</strong>
              <span className="muted">
                {" · "}
                {monthLabel(r.when, lang)}
                {r.lang !== lang && (en ? " · in Spanish" : " · en inglés")}
              </span>
            </footer>
          </li>
        ))}
      </ul>
      <div className="cta-row">
        {mapsUrl && (
          <a className="btn btn-secondary" href={mapsUrl} target="_blank" rel="noopener" data-cta="reviews-all" data-source="branch-reviews">
            {en ? "Read all reviews on Google" : "Ver todas las reseñas en Google"}
          </a>
        )}
        {reviewUrl && (
          <a className="btn btn-secondary" href={reviewUrl} target="_blank" rel="noopener" data-cta="review" data-source="branch-reviews">
            {en ? "Leave a review" : "Deja una reseña"}
          </a>
        )}
      </div>
      <p className="muted">
        <small>{en ? `Reviews copied from Google on ${reviews.asOf}; excerpts, unedited.` : `Reseñas copiadas de Google el ${reviews.asOf}; extractos sin editar.`}</small>
      </p>
    </section>
  );
}
