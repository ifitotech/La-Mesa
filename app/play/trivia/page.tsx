"use client";

import Link from "next/link";
import { ArrowLeft, Brain, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import EndOfMatchAd from "@/app/components/EndOfMatchAd";
import TriviaGame from "@/app/components/TriviaGame";
import { useCountry } from "@/contexts/CountryContext";
import { getLocalizedTrivia, getTriviaCategories, RANDOM_CATEGORY } from "@/lib/country-content";
import { getCountryProfile } from "@/lib/country-profile";
import { GameNightSession, getGameNightSession, recordGameNightRound, saveGameNightSession } from "@/lib/game-night-session";

const countries = [["CU", "Cuba"], ["PR", "Puerto Rico"], ["DO", "República Dominicana"], ["MX", "México"], ["CO", "Colombia"], ["VE", "Venezuela"], ["US", "Estados Unidos"], ["ES", "España"]] as const;

export default function TriviaPage() {
  const { country: selectedCountry } = useCountry();
  const [country, setCountry] = useState(selectedCountry.code);
  const [category, setCategory] = useState(RANDOM_CATEGORY);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [session, setSession] = useState<GameNightSession | null>(null);
  const [ready, setReady] = useState(false);
  const [seconds, setSeconds] = useState(15);
  const [hydrated, setHydrated] = useState(false);
  const english = country === "US";

  useEffect(() => { const timer = window.setTimeout(() => { const isSolo = new URLSearchParams(window.location.search).get("mode") === "solo"; const saved = isSolo ? null : getGameNightSession(); setSession(saved); setReady(!saved); setSeconds(saved?.triviaSeconds ?? 15); setHydrated(true); }, 0); return () => window.clearTimeout(timer); }, []);

  function startRound(nextCountry = country, nextCategory = category) { setCountry(nextCountry); setCategory(nextCategory); setScore(null); setAiScore(null); setRound((value) => value + 1); }
  function changeGameNightScore(id: string, change: number) { if (!session) return; const next = { ...session, participants: session.participants.map((player) => player.id === id ? { ...player, score: player.score + change } : player) }; saveGameNightSession(next); setSession(next); }
  function startHostRound() { if (session) { const next = { ...session, triviaSeconds: seconds }; saveGameNightSession(next); setSession(next); } setReady(true); }
  function finishRound(finalScore: number) { if (session) { const next = recordGameNightRound(session, getCountryProfile(country).triviaName); saveGameNightSession(next); setSession(next); } else setAiScore(320 + Math.floor(Math.random() * 380)); setScore(finalScore); }

  if (!hydrated) return <AppLayout><div className="mesa-panel mx-auto max-w-3xl rounded-3xl p-10 text-center text-slate-400">Preparando Trivia...</div></AppLayout>;
  const title = getCountryProfile(country).triviaName;

  return <AppLayout><div className="mx-auto max-w-3xl space-y-5"><Link href={session ? "/game-night" : "/solo"} className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> {english ? "Back" : "Volver"}</Link><section className="mesa-panel-gold rounded-3xl p-6 md:p-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[.24em] text-violet-300">{session ? (english ? "Host round" : "Ronda del anfitrión") : (english ? "AI duel" : "Duelo contra IA")}</p><h1 className="mt-1 flex items-center gap-3 text-3xl font-black"><Brain className="text-violet-300" /> {title}</h1></div><select value={country} onChange={(event) => startRound(event.target.value, RANDOM_CATEGORY)} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-bold outline-none">{countries.map(([code, label]) => <option key={code} value={code}>{label}</option>)}</select></div><div className="mt-6 border-t border-slate-700/70 pt-5"><p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-slate-400">{english ? "Category" : "Categoría"}</p><div className="flex flex-wrap gap-2">{getTriviaCategories(country).map((item) => <button key={item} onClick={() => startRound(country, item)} className={`rounded-xl border px-3 py-2 text-sm font-bold ${category === item ? "border-violet-300 bg-violet-500/20 text-violet-100" : "border-slate-700 bg-slate-950/70 text-slate-300"}`}>{item === RANDOM_CATEGORY ? "Random" : item}</button>)}</div></div></section><section className="mesa-panel rounded-3xl p-6 md:p-8">{!ready ? <div className="py-8 text-center"><p className="text-xs font-bold uppercase tracking-[.24em] text-amber-300">Control del anfitrión</p><h2 className="mt-3 text-3xl font-black">Configura esta ronda</h2><label className="mx-auto mt-6 block max-w-xs text-left text-sm font-bold text-slate-300">Tiempo por pregunta<select value={seconds} onChange={(event) => setSeconds(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-black"><option value={10}>10 segundos</option><option value={15}>15 segundos</option><option value={20}>20 segundos</option><option value={30}>30 segundos</option></select></label><button onClick={startHostRound} className="mt-7 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 font-black text-slate-950">Iniciar preguntas</button></div> : score === null ? <TriviaGame key={round} questions={getLocalizedTrivia(country, 10, category)} secondsPerQuestion={session?.triviaSeconds ?? seconds} scoreRecipients={session?.participants ?? []} onScoreChange={changeGameNightScore} onFinish={finishRound} /> : <div className="py-8 text-center"><p className="text-xs font-black uppercase tracking-[.24em] text-violet-300">{session ? "Ronda completada" : "Resultado contra IA"}</p>{session ? <><h2 className="mt-3 text-5xl font-black text-amber-200">{score} pts</h2><p className="mt-3 text-slate-400">La ronda fue guardada en el historial de la noche.</p></> : <div className="mx-auto mt-5 grid max-w-md grid-cols-2 gap-3"><div className="rounded-xl bg-blue-500/10 p-4"><p className="text-sm text-slate-400">Tú</p><p className="mt-1 text-3xl font-black text-blue-100">{score}</p></div><div className="rounded-xl bg-violet-500/10 p-4"><p className="text-sm text-slate-400">IA</p><p className="mt-1 text-3xl font-black text-violet-100">{aiScore}</p></div></div>} {!session && <p className="mt-4 font-black text-amber-200">{score > (aiScore ?? Infinity) ? "¡Ganaste el duelo!" : "La IA ganó esta vez. ¡Inténtalo de nuevo!"}</p>}<button onClick={() => startRound()} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 px-5 py-3 font-bold"><RotateCcw size={18} /> Jugar otra vez</button></div>}</section>{score !== null && <EndOfMatchAd placement="solo-trivia" />}</div></AppLayout>;
}
