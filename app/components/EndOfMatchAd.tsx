"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Props = {
  placement: "solo-trivia" | "game-night-results";
};

const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const adSlots: Record<Props["placement"], string | undefined> = {
  "solo-trivia": process.env.NEXT_PUBLIC_ADSENSE_SOLO_SLOT,
  "game-night-results": process.env.NEXT_PUBLIC_ADSENSE_RESULTS_SLOT,
};

export default function EndOfMatchAd({ placement }: Props) {
  const slot = adSlots[placement];
  const initialized = useRef(false);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!publisherId || !slot || !scriptReady || initialized.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
      initialized.current = true;
    } catch {
      // An ad blocker or an unavailable inventory must not affect the game result.
    }
  }, [scriptReady, slot]);

  if (!publisherId || !slot) return null;

  return (
    <section aria-label="Publicidad" className="mesa-panel overflow-hidden rounded-3xl p-4">
      <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[.18em] text-slate-500">Publicidad</p>
      <Script
        id="adsense-loader"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
        onReady={() => setScriptReady(true)}
      />
      <ins
        className="adsbygoogle block min-h-[120px]"
        style={{ display: "block" }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </section>
  );
}
