"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, RotateCcw } from "lucide-react";
import { useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import TriviaGame from "@/app/components/TriviaGame";
import { useCountry } from "@/contexts/CountryContext";
import { getBibleQuestions } from "@/lib/bible-questions";
import { GameNightSession, getGameNightSession, saveGameNightSession } from "@/lib/game-night-session";

export default function BibleQuizPage() {
  const { country } = useCountry(); const english = country.language === "en";
  const [round, setRound] = useState(0); const [score, setScore] = useState<number | null>(null);
  const [session, setSession] = useState<GameNightSession | null>(getGameNightSession);
  const [ready, setReady] = useState(() => !getGameNightSession()); const [seconds, setSeconds] = useState(() => getGameNightSession()?.triviaSeconds ?? 15);
  function changeScore(recipientId: string, change: number) { if (!session) return; const next = { ...session, participants: session.participants.map((participant) => participant.id === recipientId ? { ...participant, score: participant.score + change } : participant) }; saveGameNightSession(next); setSession(next); }
  function start() { if (session) { const next = { ...session, triviaSeconds: seconds }; saveGameNightSession(next); setSession(next); } setReady(true); }
  function replay() { setScore(null); setRound((value) => value + 1); }
  return <AppLayout><div className="mx-auto max-w-3xl space-y-5"><Link href={session ? "/game-night" : "/games"} className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> {english ? "Games" : "Juegos"}</Link><section className="mesa-panel-gold rounded-3xl p-6 text-center md:p-8"><BookOpen className="mx-auto text-amber-300" size={34} /><p className="mt-4 text-xs font-bold uppercase tracking-[.24em] text-amber-300">{english ? "Faith · Family · Fun" : "Fe · Familia · Diversión"}</p><h1 className="mt-2 text-3xl font-black">{english ? "Bible Quiz" : "Trivia Bíblica"}</h1><p className="mx-auto mt-3 max-w-xl text-slate-300">{english ? "Test your Bible knowledge in a friendly round for everyone." : "Pon a prueba tus conocimientos bíblicos en una ronda para toda la familia."}</p></section><section className="mesa-panel rounded-3xl p-6 md:p-8">{!ready ? <div className="py-7 text-center"><p className="text-xs font-bold uppercase tracking-[.24em] text-amber-300">{english ? "Host controls" : "Control del anfitrión"}</p><h2 className="mt-3 text-3xl font-black">{english ? "Set up this round" : "Configura esta ronda"}</h2><label className="mx-auto mt-6 block max-w-xs text-left text-sm font-bold text-slate-300">{english ? "Time per question" : "Tiempo por pregunta"}<select value={seconds} onChange={(event) => setSeconds(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-black"><option value={10}>10 {english ? "seconds" : "segundos"}</option><option value={15}>15 {english ? "seconds" : "segundos"}</option><option value={20}>20 {english ? "seconds" : "segundos"}</option><option value={30}>30 {english ? "seconds" : "segundos"}</option></select></label><button onClick={start} className="mt-7 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 font-black text-slate-950">{english ? "Start questions" : "Iniciar preguntas"}</button></div> : score === null ? <TriviaGame key={round} questions={getBibleQuestions(country.language)} secondsPerQuestion={session?.triviaSeconds ?? seconds} scoreRecipients={session?.participants ?? []} onScoreChange={changeScore} onFinish={setScore} /> : <div className="py-10 text-center"><p className="text-xs font-bold uppercase tracking-[.24em] text-amber-300">{english ? "Round complete" : "Ronda completada"}</p><h2 className="mt-3 text-5xl font-black text-amber-200">{score} pts</h2><p className="mt-3 text-slate-400">{english ? "Ready for another round?" : "¿Listos para otra ronda?"}</p><button onClick={replay} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-3 font-bold text-slate-950"><RotateCcw size={18} /> {english ? "Play again" : "Jugar otra vez"}</button></div>}</section></div></AppLayout>;
}
