"use client";

import Link from "next/link";
import { ArrowLeft, Flame, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { getChallenges } from "@/lib/challenges";

const categories = ["random", "Risas", "Equipo", "Creatividad"];

export default function ChallengesPage() {
  const [category, setCategory] = useState("random");
  const [deck, setDeck] = useState(() => getChallenges());
  const [index, setIndex] = useState(0);

  function changeCategory(nextCategory: string) {
    setCategory(nextCategory);
    setDeck(getChallenges(nextCategory));
    setIndex(0);
  }

  function next() {
    if (index + 1 >= deck.length) {
      setDeck(getChallenges(category));
      setIndex(0);
      return;
    }
    setIndex((value) => value + 1);
  }

  return <AppLayout lockViewport><div className="mx-auto max-w-3xl space-y-5">
    <Link href="/games" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> Juegos</Link>
    <section className="mesa-panel-gold rounded-3xl p-6 text-center"><p className="text-xs font-bold uppercase tracking-[.24em] text-fuchsia-300">Para toda la sala · Sin internet</p><h1 className="mt-2 flex justify-center gap-3 text-3xl font-black"><Flame className="text-fuchsia-300" /> Retos</h1><p className="mt-3 text-slate-300">Tomen turnos, saquen una carta y adapten cualquier reto para que todos se sientan cómodos.</p><div className="mt-5 flex flex-wrap justify-center gap-2">{categories.map((item) => <button key={item} onClick={() => changeCategory(item)} className={`rounded-xl border px-3 py-2 text-sm font-bold ${category === item ? "border-fuchsia-300 bg-fuchsia-500/20 text-white" : "border-slate-700 bg-slate-950/70 text-slate-300"}`}>{item === "random" ? "Random" : item}</button>)}</div></section>
    <section className="mesa-panel rounded-3xl p-8 text-center md:p-12"><p className="text-xs font-bold uppercase tracking-[.2em] text-fuchsia-300">{deck[index].category} · Reto {index + 1}/{deck.length}</p><Sparkles className="mx-auto mt-7 text-amber-300" size={38} /><h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black leading-tight md:text-4xl">{deck[index].prompt}</h2><div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"><button onClick={next} className="rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 px-6 py-3 font-black">Siguiente reto</button><button onClick={() => { setDeck(getChallenges(category)); setIndex(0); }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-6 py-3 font-bold hover:bg-slate-800"><RotateCcw size={17} /> Mezclar</button></div></section>
  </div></AppLayout>;
}
