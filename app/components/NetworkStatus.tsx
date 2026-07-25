"use client";

import { Wifi, WifiOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function NetworkStatus() {
  const [online, setOnline] = useState(true);
  const [showRestored, setShowRestored] = useState(false);
  const wasOffline = useRef(false);

  useEffect(() => {
    wasOffline.current = !window.navigator.onLine;

    function handleOffline() {
      wasOffline.current = true;
      setShowRestored(false);
      setOnline(false);
    }

    function handleOnline() {
      setOnline(true);
      if (wasOffline.current) {
        setShowRestored(true);
        wasOffline.current = false;
      }
    }

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    const initialStatusTimer = window.setTimeout(() => {
      if (!window.navigator.onLine) handleOffline();
    }, 0);
    return () => {
      window.clearTimeout(initialStatusTimer);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  useEffect(() => {
    if (!showRestored) return;
    const timer = window.setTimeout(() => setShowRestored(false), 3000);
    return () => window.clearTimeout(timer);
  }, [showRestored]);

  if (online && !showRestored) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed left-1/2 top-3 z-[100] flex -translate-x-1/2 items-center gap-2 rounded-full border px-4 py-2 text-sm font-black shadow-2xl backdrop-blur-xl ${
        online
          ? "border-emerald-300/40 bg-emerald-950/95 text-emerald-100"
          : "border-amber-300/40 bg-amber-950/95 text-amber-100"
      }`}
    >
      {online ? <Wifi size={17} /> : <WifiOff size={17} />}
      {online ? "Conexión restaurada" : "Sin conexión · algunos datos no se guardarán"}
    </div>
  );
}
