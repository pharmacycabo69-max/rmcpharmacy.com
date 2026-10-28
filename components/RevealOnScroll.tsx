"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Adds the "scrolled" class (header shadow) and fades in elements marked data-reveal as they enter the viewport.
// With reduced motion, or without IntersectionObserver, nothing is hidden and nothing animates.
export function RevealOnScroll() {
  const pathname = usePathname();

  useIsoLayoutEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) el.classList.add("in");
      else io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => document.documentElement.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
