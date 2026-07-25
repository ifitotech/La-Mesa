"use client";

import Link from "next/link";
import { ArrowLeft, Heart, RotateCcw, Shuffle } from "lucide-react";
import { useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { getCouplesQuestions } from "@/lib/couples-questions";

const categories = ["random", "Conexión", "Recuerdos", "Risas", "Sueños"];

export default function CouplesPage() {
  const [category, setCategory] = useState("random");
  const [questions, setQuestions] = useState(() => getCouplesQuestions(category));
  const [current, setCurrent] = useState(0);
  const question = questions[current];

  function chooseCategory(value: string) {
    setCategory(value);
    setQuestions(getCouplesQuestions(value));
    setCurrent(0);
  }

  function nextQuestion() {
    if (current + 1 >= questions.length) {
      setCurrent(0);
      setQuestions(getCouplesQuestions(category));
      return;
    }
    setCurrent((value) => value + 1);
  }

  return <AppLayout lockViewport><div className="mx-auto max-w-3xl space-y-5">
    <Link href="/games" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> Juegos</Link>
    <section className="mesa-panel-gold rounded-3xl p-6 md:p-8">
      <p className="text-xs font-bold uppercase tracking-[.24em] text-rose-300">Para dos personas · Sin internet</p>
      <h1 className="mt-2 flex items-center gap-3 text-3xl font-black"><Heart className="fill-rose-400 text-rose-400" /> Entre nosotros</h1>
      <p className="mt-3 max-w-2xl text-slate-300">Tomen turnos, hablen con calma y pasen a la siguiente carta cuando ambos hayan respondido. No hay respuestas correctas.</p>
      <div className="mt-6 flex flex-wrap gap-2">{categories.map((item) => <button key={item} onClick={() => chooseCategory(item)} className={`rounded-xl border px-3 py-2 text-sm font-bold ${category === item ? "border-rose-300 bg-rose-500/20 text-white" : "border-slate-700 bg-slate-950/70 text-slate-300 hover:border-slate-500"}`}>{item === "random" ? "Random" : item}</button>)}</div>
    </section>
    <section className="mesa-panel rounded-3xl p-7 text-center md:p-10">
      <p className="text-xs font-bold uppercase tracking-[.22em] text-rose-300">{question.category} · Carta {current + 1}/{questions.length}</p>
      <h2 className="mx-auto mt-7 max-w-2xl text-3xl font-black leading-tight md:text-4xl">{question.prompt}</h2>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"><button onClick={nextQuestion} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-3 font-bold"><Shuffle size={18} /> Siguiente pregunta</button><button onClick={() => { setCurrent(0); setQuestions(getCouplesQuestions(category)); }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-6 py-3 font-bold text-slate-200 hover:bg-slate-800"><RotateCcw size={18} /> Nueva ronda</button></div>
    </section>
  </div></AppLayout>;
}
