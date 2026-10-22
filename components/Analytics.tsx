import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// GA4 is configured inside the GTM container (see docs/analytics.md). Nothing loads without an ID.
export function AnalyticsHead() {
  if (!GTM_ID) return null;
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=document.getElementsByTagName('script')[0],j=document.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';f.parentNode.insertBefore(j,f);`}
    </Script>
  );
}

export function AnalyticsNoscript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
    </noscript>
  );
}
