import type { ZoneArtKind } from "@/lib/zones";

// Original flat illustrations in the brand palette (not photos). They give each zone card a visual
// without using stock or generated pictures. Colors come from CSS variables, so dark mode just works.
function Scene({ kind }: { kind: ZoneArtKind }) {
  switch (kind) {
    case "marina":
      return (
        <>
          <circle className="a-sun" cx="248" cy="52" r="22" />
          <path className="a-hill" d="M0 112 Q60 84 118 104 T240 98 T320 108 V120 H0Z" />
          <rect className="a-sea" x="0" y="112" width="320" height="68" />
          <path className="a-wave" d="M0 128 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" />
          <path className="a-wave" d="M0 150 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" />
          <path className="a-boat" d="M70 118 h46 l-8 12 h-30z" />
          <path className="a-sail" d="M92 116 V76 L112 112z" />
          <path className="a-sail2" d="M88 116 V84 L72 112z" />
          <path className="a-boat" d="M190 124 h38 l-7 10 h-24z" />
          <path className="a-sail" d="M208 122 V92 L224 118z" />
        </>
      );
    case "beach":
      return (
        <>
          <circle className="a-sun" cx="62" cy="48" r="22" />
          <rect className="a-sea" x="0" y="86" width="320" height="40" />
          <path className="a-wave" d="M0 100 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" />
          <path className="a-sand" d="M0 124 Q120 104 230 118 T320 112 V180 H0Z" />
          <path className="a-umb" d="M214 112 a30 22 0 0 1 60 0z" />
          <rect className="a-pole" x="243" y="112" width="3" height="40" />
          <path className="a-palm" d="M64 150 Q70 120 66 94" />
          <path className="a-leaf" d="M66 94 q-26 -4 -34 14 q20 -10 34 -8 q-6 -12 -22 -16 q22 -2 22 10 q14 -20 40 -10 q-22 2 -30 14z" />
        </>
      );
    case "hills":
      return (
        <>
          <circle className="a-sun" cx="256" cy="46" r="20" />
          <path className="a-hill2" d="M0 120 L70 62 L132 108 L196 56 L260 104 L320 74 V180 H0Z" />
          <path className="a-hill" d="M0 140 Q80 96 170 128 T320 118 V180 H0Z" />
          <rect className="a-house" x="92" y="116" width="26" height="16" rx="2" />
          <rect className="a-house" x="132" y="122" width="22" height="14" rx="2" />
          <rect className="a-house" x="212" y="118" width="30" height="18" rx="2" />
          <rect className="a-pane" x="98" y="121" width="14" height="5" rx="1" />
          <rect className="a-pane" x="218" y="123" width="18" height="6" rx="1" />
        </>
      );
    case "golf":
      return (
        <>
          <circle className="a-sun" cx="60" cy="44" r="20" />
          <path className="a-hill2" d="M0 96 Q90 70 190 90 T320 82 V180 H0Z" />
          <path className="a-green" d="M0 128 Q110 100 210 124 T320 112 V180 H0Z" />
          <ellipse className="a-sand" cx="108" cy="146" rx="34" ry="9" />
          <ellipse className="a-hole" cx="232" cy="136" rx="22" ry="7" />
          <rect className="a-pole" x="231" y="98" width="2.5" height="38" />
          <path className="a-flag" d="M233 98 l22 8 l-22 8z" />
          <circle className="a-ball" cx="196" cy="150" r="4" />
        </>
      );
    case "sunset":
      return (
        <>
          <rect className="a-sky2" x="0" y="0" width="320" height="104" />
          <circle className="a-sun" cx="160" cy="98" r="42" />
          <rect className="a-sea" x="0" y="104" width="320" height="76" />
          <path className="a-glow" d="M120 112 H200 M104 126 H216 M126 140 H194 M140 154 H180" />
          <path className="a-rock" d="M0 108 L26 82 L52 108 L74 94 L96 108Z" />
          <path className="a-rock" d="M236 108 L268 76 L292 98 L320 84 V108Z" />
        </>
      );
    case "surf":
      return (
        <>
          <circle className="a-sun" cx="256" cy="44" r="20" />
          <rect className="a-sea" x="0" y="80" width="320" height="100" />
          <path className="a-curl" d="M0 140 Q50 70 120 96 Q150 106 140 132 Q112 112 96 124 Q70 142 0 160Z" />
          <path className="a-wave" d="M150 128 q20 -8 40 0 t40 0 t40 0 t40 0" />
          <path className="a-wave" d="M150 150 q20 -8 40 0 t40 0 t40 0 t40 0" />
          <path className="a-board" d="M196 108 q22 -26 44 0 q-22 8 -44 0z" />
        </>
      );
    case "town":
      return (
        <>
          <circle className="a-sun" cx="266" cy="42" r="18" />
          <rect className="a-sky2" x="0" y="116" width="320" height="64" />
          <rect className="a-house" x="14" y="80" width="86" height="60" />
          <rect className="a-house2" x="108" y="64" width="64" height="76" />
          <rect className="a-house" x="180" y="88" width="76" height="52" />
          <rect className="a-house2" x="262" y="76" width="50" height="64" />
          <path className="a-roof" d="M104 64 L140 40 L176 64z" />
          <rect className="a-pane" x="24" y="94" width="14" height="22" rx="7" />
          <rect className="a-pane" x="52" y="94" width="14" height="22" rx="7" />
          <rect className="a-pane" x="122" y="82" width="12" height="20" rx="6" />
          <rect className="a-pane" x="146" y="82" width="12" height="20" rx="6" />
          <rect className="a-pane" x="196" y="100" width="14" height="22" rx="7" />
          <rect className="a-pane" x="276" y="90" width="12" height="20" rx="6" />
          <rect className="a-ground" x="0" y="138" width="320" height="42" />
        </>
      );
  }
}

export function ZoneArt({ kind }: { kind: ZoneArtKind }) {
  return (
    <svg className="zone-svg" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect className="a-sky" x="0" y="0" width="320" height="180" />
      <Scene kind={kind} />
    </svg>
  );
}
