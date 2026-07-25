"use client";

import Link from "next/link";
import { ArrowLeft, Brain, RotateCcw } from "lucide-react";
import { useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import EndOfMatchAd from "@/app/components/EndOfMatchAd";
import TriviaGame from "@/app/components/TriviaGame";
import { getLocalizedTrivia, getTriviaCategories, RANDOM_CATEGORY } from "@/lib/country-content";
import { GameNightSession, getGameNightSession, saveGameNightSession } from "@/lib/game-night-session";

const countries = [
  ["CU", "Cuba"], ["PR", "Puerto Rico"], ["DO", "República Dominicana"],
  ["MX", "México"], ["CO", "Colombia"], ["VE", "Venezuela"],
  ["US", "Estados Unidos"], ["ES", "España"],
] as const;

export default function SoloTriviaPage() {
  const [country, setCountry] = useState("CU");
  const [category, setCategory] = useState(RANDOM_CATEGORY);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [gameNightSession, setGameNightSession] = useState<GameNightSession | null>(getGameNightSession);
  const [triviaReady, setTriviaReady] = useState(() => !getGameNightSession());
  const [hostSeconds, setHostSeconds] = useState(() => getGameNightSession()?.triviaSeconds ?? 15);

  function startRound(nextCountry = country, nextCategory = category) {
    setCountry(nextCountry);
    setCategory(nextCategory);
    setScore(null);
    setRound((value) => value + 1);
  }

  function changeGameNightScore(recipientId: string, change: number) {
    if (!gameNightSession) return;
    const nextSession = {
      ...gameNightSession,
      participants: gameNightSession.participants.map((participant) => participant.id === recipientId ? { ...participant, score: participant.score + change } : participant),
    };
    saveGameNightSession(nextSession);
    setGameNightSession(nextSession);
  }

  function hostStartsTrivia() {
    if (gameNightSession) {
      const nextSession = { ...gameNightSession, triviaSeconds: hostSeconds };
      saveGameNightSession(nextSession);
      setGameNightSession(nextSession);
    }
    setTriviaReady(true);
  }

  return <AppLayout>
    <div className="mx-auto max-w-3xl space-y-5">
      <Link href="/games" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> Juegos</Link>
      <section className="mesa-panel-gold rounded-3xl p-6 md:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[.24em] text-violet-300">Modo individual</p><h1 className="mt-1 flex items-center gap-3 text-3xl font-black"><Brain className="text-violet-300" /> Trivia local</h1></div>
          <select value={country} onChange={(event) => startRound(event.target.value, RANDOM_CATEGORY)} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-bold outline-none focus:border-violet-400">
            {countries.map(([code, label]) => <option key={code} value={code}>{label}</option>)}
          </select>
        </div>
        <div className="mt-6 border-t border-slate-700/70 pt-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-slate-400">Categoria</p>
          <div className="flex flex-wrap gap-2">
            {getTriviaCategories(country).map((item) => {
              const selected = category === item;
              return <button key={item} onClick={() => startRound(country, item)} className={`rounded-xl border px-3 py-2 text-sm font-bold transition ${selected ? "border-violet-300 bg-violet-500/20 text-violet-100" : "border-slate-700 bg-slate-950/70 text-slate-300 hover:border-slate-500"}`}>
                {item === RANDOM_CATEGORY ? "Random" : item}
              </button>;
            })}
          </div>
          <p className="mt-3 text-sm text-slate-400">{category === RANDOM_CATEGORY ? "Random mezcla todas las categorias disponibles." : `Jugaras preguntas de ${category}.`}</p>
        </div>
      </section>
      <section className="mesa-panel rounded-3xl p-6 md:p-8">
        {!triviaReady ? <div className="py-8 text-center"><p className="text-xs font-bold uppercase tracking-[.24em] text-amber-300">Control del anfitrión</p><h2 className="mt-3 text-3xl font-black">Configura esta ronda de Trivia</h2><label className="mx-auto mt-6 block max-w-xs text-left text-sm font-bold text-slate-300">Tiempo por pregunta<select value={hostSeconds} onChange={(event) => setHostSeconds(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-black outline-none focus:border-amber-300"><option value={10}>10 segundos</option><option value={15}>15 segundos</option><option value={20}>20 segundos</option><option value={30}>30 segundos</option></select></label><button onClick={hostStartsTrivia} className="mt-7 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 font-black text-slate-950">Iniciar preguntas</button></div> : score === null ? <TriviaGame key={round} questions={getLocalizedTrivia(country, 10, category)} secondsPerQuestion={gameNightSession?.triviaSeconds ?? hostSeconds} scoreRecipients={gameNightSession?.participants ?? []} onScoreChange={changeGameNightScore} onFinish={setScore} /> : <div className="py-10 text-center"><p className="text-xs font-bold uppercase tracking-[.24em] text-violet-300">Ronda completada</p><h2 className="mt-3 text-5xl font-black text-amber-200">{score} pts</h2><p className="mt-3 text-slate-400">Excelente. Prueba otro país o vuelve a jugar para superar tu marca.</p><button onClick={() => startRound()} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 px-5 py-3 font-bold"><RotateCcw size={18} /> Jugar otra vez</button></div>}
      </section>
      {score !== null && <EndOfMatchAd placement="solo-trivia" />}
    </div>
  </AppLayout>;
}
