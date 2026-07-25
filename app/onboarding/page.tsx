"use client";

import { Check, Globe2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/contexts/AuthContext";
import { countryProfiles } from "@/lib/country-profile";
import { getPlayer, updateCountry } from "@/services/player";

export default function OnboardingPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const [country, setCountry] = useState("CU");
  const [saving, setSaving] = useState(false);

  function nextDestination() {
    const next = window.localStorage.getItem("la-mesa-after-auth");
    window.localStorage.removeItem("la-mesa-after-auth");
    return next?.startsWith("/") ? next : "/dashboard";
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    void getPlayer(user.uid).then((player) => {
      if (player?.onboardingCompleted) router.replace(nextDestination());
      if (player?.country) setCountry(player.country);
    });
  }, [loading, router, user]);

  async function continueToApp() {
    setSaving(true);
    try {
      if (user) {
        await updateCountry(user.uid, country, true);
      } else {
        window.localStorage.setItem("la-mesa-country", country);
      }
      router.replace(nextDestination());
    } finally { setSaving(false); }
  }

  return <main className="min-h-screen bg-[#050b12] px-4 py-10 text-white"><div className="mx-auto max-w-5xl"><div className="text-center"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300"><Globe2 size={28} /></span><p className="mt-5 text-xs font-bold uppercase tracking-[.28em] text-violet-300">Bienvenido a La Mesa</p><h1 className="mt-2 text-4xl font-black md:text-5xl">¿De dónde es tu Game Night?</h1><p className="mx-auto mt-3 max-w-xl text-slate-400">Adaptaremos preguntas, expresiones, música, temas y futuras experiencias a tu país.</p></div><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{countryProfiles.map((item) => <button key={item.code} onClick={() => setCountry(item.code)} className={`relative rounded-2xl border p-5 text-left transition ${country === item.code ? "border-violet-300 bg-violet-500/15 shadow-lg shadow-violet-900/30" : "border-slate-700 bg-slate-900/70 hover:border-slate-500"}`}><span className="text-4xl">{item.flag}</span><p className="mt-4 font-black">{item.name}</p><p className="mt-1 text-sm text-slate-400">{item.greeting}</p>{country === item.code && <span className="absolute right-4 top-4 rounded-full bg-violet-500 p-1"><Check size={14} /></span>}</button>)}</div><button onClick={continueToApp} disabled={saving} className="mx-auto mt-9 flex rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 px-7 py-3.5 font-black disabled:opacity-50">{saving ? "Guardando..." : "Continuar a La Mesa"}</button></div></main>;
}
