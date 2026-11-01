import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// GA4 is configured inside the GTM container (see docs/analytics.md). Nothing loads without an ID.
export const ANALYTICS_ENABLED = Boolean(GTM_ID);

export function AnalyticsHead() {
  if (!GTM_ID) return null;
  return (
    <>
      {/* Consent Mode v2 defaults: a plain inline script so it runs synchronously, before gtm.js (loaded afterInteractive).
          A saved choice (see ConsentBanner) is honored on the spot. */}
      <script
        id="consent-default"
        dangerouslySetInnerHTML={{
          __html:
            "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}" +
            "var c='denied';try{if(localStorage.getItem('rmc_consent_v1')==='granted')c='granted';}catch(e){}" +
            "gtag('consent','default',{ad_storage:c,ad_user_data:c,ad_personalization:c,analytics_storage:c,wait_for_update:500});",
        }}
      />
      <Script id="gtm" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=document.getElementsByTagName('script')[0],j=document.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';f.parentNode.insertBefore(j,f);`}
      </Script>
    </>
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
