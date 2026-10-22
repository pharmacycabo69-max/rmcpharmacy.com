import type { ReactNode } from "react";

// Root layout is a passthrough; <html> is rendered in app/[lang]/layout.tsx so it can carry the language.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
