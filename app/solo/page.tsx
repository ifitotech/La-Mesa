"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Bot } from "lucide-react";

import AppLayout from "@/app/components/AppLayout";
import GameArtwork from "@/app/components/GameArtwork";
import { useCountry } from "@/contexts/CountryContext";
import { gameCatalog, getGameCopy } from "@/lib/game-catalog";

export default function SoloGamesPage() {
  const { country, isEnglish } = useCountry();
  const trivia = gameCatalog.find((game) => game.id === "trivia");
  if (!trivia) return null;
  const copy = getGameCopy(trivia, isEnglish);

  return <AppLayout><div className="mx-auto max-w-5xl space-y-6"><Link href="/dashboard" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> {isEnglish ? "Home" : "Inicio"}</Link><section className="mesa-panel-gold rounded-3xl p-7 md:p-10"><Bot className="text-violet-300" size={36} /><p className="mt-5 text-xs font-black uppercase tracking-[.25em] text-violet-300">{isEnglish ? "Your pace · AI challenge" : "A tu ritmo · Desafío contra IA"}</p><h1 className="mt-2 text-4xl font-black md:text-5xl">{isEnglish ? "Play Solo" : "Jugar Solo"}</h1><p className="mt-4 max-w-2xl text-slate-300">{isEnglish ? "Every game in this section is a challenge against the AI. New AI opponents will be added only when their rules are complete." : "Cada juego de esta sección es un desafío contra la IA. Nuevos rivales IA se añadirán solo cuando sus reglas estén completas."}</p></section><section className="mesa-panel flex overflow-hidden rounded-3xl"><GameArtwork gameId="trivia" english={isEnglish} className="min-h-56 w-[42%] max-w-52" /><div className="flex min-w-0 flex-1 flex-col p-5 md:p-7"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[.22em] text-violet-300">{isEnglish ? "AI duel" : "Duelo contra IA"}</p><h2 className="mt-2 text-3xl font-black">{country.triviaName}</h2><p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">{copy.description}</p></div><span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-black text-emerald-200">{isEnglish ? "AVAILABLE" : "DISPONIBLE"}</span></div><div className="mt-auto pt-6"><Link href="/play/trivia" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-black hover:bg-violet-500">{isEnglish ? "Challenge the AI" : "Retar a la IA"} <ArrowRight size={17} /></Link></div></div></section><Link href="/tournaments" className="mesa-panel flex items-center justify-between rounded-2xl p-5 transition hover:border-amber-300/50"><span><span className="block text-xs font-black uppercase tracking-[.22em] text-amber-300">{isEnglish ? "Real competition" : "Competencia real"}</span><span className="mt-1 block text-xl font-black">{isEnglish ? "Upcoming tournaments" : "Próximos torneos"}</span></span><ArrowRight className="text-amber-300" /></Link></div></AppLayout>;
}
