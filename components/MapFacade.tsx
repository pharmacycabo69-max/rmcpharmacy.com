"use client";

import { useState } from "react";

type Props = {
  /** Google Maps embed URL, loaded only after the visitor asks for it. */
  src: string;
  /** Plain Google Maps link that works without loading the embed. */
  openUrl: string;
  title: string;
  showLabel: string;
  openLabel: string;
};

/**
 * Google Maps costs ~460 KB of JavaScript and over a second of main-thread time on a phone,
 * so the page shows a light placeholder and loads the real map on tap.
 */
export function MapFacade({ src, openUrl, title, showLabel, openLabel }: Props) {
  const [on, setOn] = useState(false);
  return (
    <figure className="map-embed">
      {on ? (
        <iframe src={src} title={title} allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="map-facade">
          <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true" className="map-facade-pin">
            <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
          </svg>
          <button type="button" className="btn btn-secondary" onClick={() => setOn(true)} data-cta="map" aria-label={`${showLabel}: ${title}`}>
            {showLabel}
          </button>
          <a href={openUrl} target="_blank" rel="noopener" data-cta="directions">
            {openLabel}
          </a>
        </div>
      )}
    </figure>
  );
}
