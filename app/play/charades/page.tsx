"use client";

import Link from "next/link";
import { ArrowLeft, Check, Clock3, RotateCcw, SkipForward, Theater } from "lucide-react";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { getCharades } from "@/lib/charades";

const categories = ["random", "Películas", "Acciones", "Animales", "Vida diaria"];

export default function CharadesPage() {
  const [category, setCategory] = useState("random");
  const [deck, setDeck] = useState(() => getCharades());
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const card = deck[index];

  useEffect(() => {
    if (!running || seconds === 0) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [running, seconds]);

  function chooseCategory(nextCategory: string) {
    setCategory(nextCategory);
    setDeck(getCharades(nextCategory));
    setIndex(0);
    setScore(0);
    setSeconds(60);
    setRunning(false);
  }

  function advance(correct: boolean) {
    if (correct) setScore((value) => value + 1);
    if (index + 1 >= deck.length) { setRunning(false); return; }
    setIndex((value) => value + 1);
  }

  function start() {
    setDeck(getCharades(category));
    setIndex(0);
    setScore(0);
    setSeconds(60);
    setRunning(true);
  }

  return <AppLayout><div className="mx-auto max-w-3xl space-y-5">
    <Link href="/games" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> Juegos</Link>
    <section className="mesa-panel-gold rounded-3xl p-6 text-center"><p className="text-xs font-bold uppercase tracking-[.24em] text-amber-300">Para 2 o más · Sin hablar</p><h1 className="mt-2 flex justify-center gap-3 text-3xl font-black"><Theater className="text-amber-300" /> Mímica</h1><p className="mt-3 text-slate-300">Elige una categoría. Una persona actúa sin palabras y el equipo intenta adivinar.</p><div className="mt-5 flex flex-wrap justify-center gap-2">{categories.map((item) => <button key={item} onClick={() => chooseCategory(item)} className={`rounded-xl border px-3 py-2 text-sm font-bold ${category === item ? "border-amber-300 bg-amber-400/15 text-amber-100" : "border-slate-700 bg-slate-950/70 text-slate-300"}`}>{item === "random" ? "Random" : item}</button>)}</div></section>
    <section className="mesa-panel rounded-3xl p-7 text-center md:p-10"><div className="flex justify-between text-sm font-bold text-slate-400"><span>{score} puntos</span><span className={seconds <= 10 ? "text-rose-300" : "text-amber-200"}><Clock3 className="mr-1 inline" size={15} />{seconds}s</span><span>{index + 1}/{deck.length}</span></div>{running && seconds > 0 ? <><p className="mt-9 text-xs font-bold uppercase tracking-[.2em] text-amber-300">Actúa sin hablar</p><h2 className="mt-4 text-4xl font-black md:text-5xl">{card.prompt}</h2><div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"><button onClick={() => advance(false)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-6 py-3 font-bold hover:bg-slate-800"><SkipForward size={18} /> Pasar</button><button onClick={() => advance(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3 font-bold"><Check size={18} /> Adivinaron</button></div></> : <div className="py-10"><h2 className="text-3xl font-black">{seconds === 0 ? "¡Tiempo terminado!" : "¿Listos para actuar?"}</h2><p className="mt-3 text-slate-400">Última ronda: {score} puntos.</p><button onClick={start} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-6 py-3 font-black"><RotateCcw size={18} /> Empezar ronda</button></div>}</section>
  </div></AppLayout>;
}
