import { NextResponse, type NextRequest } from "next/server";
import { toInternalSegments } from "./lib/routes";

// English is served without a prefix, Spanish under /es. Internally every page lives under app/[lang].
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const url = request.nextUrl.clone();

  if (segments[0] === "en") {
    url.pathname = "/" + segments.slice(1).join("/");
    return NextResponse.redirect(url, 308);
  }
  if (segments[0] === "es") {
    url.pathname = "/es/" + toInternalSegments(segments.slice(1)).join("/");
    return NextResponse.rewrite(url);
  }
  url.pathname = "/en/" + segments.join("/");
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
