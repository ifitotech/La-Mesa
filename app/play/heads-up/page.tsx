"use client";

import Link from "next/link";
import { ArrowLeft, Check, Hand, Lightbulb, RotateCcw, SkipForward, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { useCountry } from "@/contexts/CountryContext";
import { getGameNightSession, GameNightSession, saveGameNightSession } from "@/lib/game-night-session";
import { getHeadsUpWords } from "@/lib/heads-up-words";

const ROUND_SECONDS = 60;

export default function HeadsUpPage() {
  const { country } = useCountry();
  const [words, setWords] = useState(() => getHeadsUpWords(country.code));
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(ROUND_SECONDS);
  const [playing, setPlaying] = useState(false);
  const [points, setPoints] = useState(0);
  const [gameNight, setGameNight] = useState<GameNightSession | null>(getGameNightSession);
  const [recipientId, setRecipientId] = useState(() => getGameNightSession()?.participants[0]?.id ?? "");
  const current = words[index];

  useEffect(() => {
    if (!playing || seconds === 0) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [playing, seconds]);

  function awardPoint() {
    if (!gameNight || !recipientId) return;
    const nextSession = { ...gameNight, participants: gameNight.participants.map((participant) => participant.id === recipientId ? { ...participant, score: participant.score + 1 } : participant) };
    saveGameNightSession(nextSession);
    setGameNight(nextSession);
  }

  function next(correct: boolean) {
    if (correct) { setPoints((value) => value + 1); awardPoint(); }
    if (index + 1 >= words.length) { setPlaying(false); return; }
    setIndex((value) => value + 1);
  }

  function startNewRound() {
    setWords(getHeadsUpWords(country.code));
    setIndex(0);
    setPoints(0);
    setSeconds(ROUND_SECONDS);
    setPlaying(true);
  }

  return <AppLayout lockViewport><div className="mx-auto max-w-3xl space-y-5">
    <Link href="/game-night" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> Game Night</Link>
    <section className="mesa-panel-gold rounded-3xl p-6 text-center md:p-8"><p className="text-xs font-bold uppercase tracking-[.24em] text-orange-300">Para 2 o más · {country.flag} {country.name}</p><h1 className="mt-2 flex justify-center gap-3 text-3xl font-black"><Hand className="text-orange-300" /> Heads Up</h1><p className="mx-auto mt-3 max-w-xl text-slate-300">Una persona sostiene la pantalla sin mirar la palabra; los demás dan pistas. Pulsa correcto o pasar.</p></section>
    <section className="mesa-panel rounded-3xl p-7 text-center md:p-10"><div className="flex items-center justify-between text-sm font-bold text-slate-400"><span>{points} puntos</span><span className={seconds <= 10 ? "text-rose-300" : "text-amber-200"}>{seconds}s</span><span>{index + 1}/{words.length}</span></div>{gameNight?.participants.length ? <label className="mx-auto mt-6 block max-w-sm rounded-2xl border border-amber-300/35 bg-amber-400/10 p-4 text-left"><span className="flex items-center gap-2 text-sm font-black text-amber-200"><Trophy size={16} /> Punto para</span><select value={recipientId} onChange={(event) => setRecipientId(event.target.value)} disabled={playing} className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 font-bold outline-none focus:border-amber-300">{gameNight.participants.map((participant) => <option key={participant.id} value={participant.id}>{participant.name} · {participant.score} pts</option>)}</select></label> : null}{playing ? <><h2 className="mt-10 text-5xl font-black md:text-6xl">{current.word}</h2><div className="mt-6 flex items-center justify-center gap-2 text-slate-400"><Lightbulb size={18} /> {current.hint}</div><div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"><button onClick={() => next(false)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-6 py-3 font-bold hover:bg-slate-800"><SkipForward size={18} /> Pasar</button><button onClick={() => next(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3 font-bold"><Check size={18} /> Correcto</button></div></> : <div className="py-10"><h2 className="text-3xl font-black">{seconds === 0 ? "¡Tiempo terminado!" : "¿Listos para las pistas?"}</h2><p className="mt-3 text-slate-400">Consiguieron {points} {points === 1 ? "palabra" : "palabras"}.</p><button onClick={startNewRound} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-600 px-6 py-3 font-black"><RotateCcw size={18} /> {points ? "Nueva ronda" : "Empezar"}</button></div>}</section>
  </div></AppLayout>;
}
