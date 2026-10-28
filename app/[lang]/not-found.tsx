import Link from "next/link";

// Shown for unknown pages. The language is not available here, so both are offered.
export default function NotFound() {
  return (
    <main className="container section" style={{ minHeight: "60vh" }}>
      <p className="eyebrow">404</p>
      <h1>Page not found · Página no encontrada</h1>
      <p className="lead">The page you are looking for does not exist. / La página que buscas no existe.</p>
      <div className="cta-row">
        <Link className="btn btn-primary" href="/">
          Home
        </Link>
        <Link className="btn btn-secondary" href="/es">
          Inicio (español)
        </Link>
      </div>
    </main>
  );
}
