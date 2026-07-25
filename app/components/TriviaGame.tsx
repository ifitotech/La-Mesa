"use client";

import { Check, Clock3, Crown, Sparkles, Trophy, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Question } from "@/services/questions";

type TriviaQuestion = Pick<Question, "id" | "question" | "options" | "answer">;
type ScoreRecipient = { id: string; name: string };
type Props = {
  questions: TriviaQuestion[];
  onFinish(score: number): void;
  secondsPerQuestion?: number;
  scoreRecipients?: ScoreRecipient[];
  onScoreChange?: (recipientId: string, change: number) => void;
};

const optionLabels = ["A", "B", "C", "D"];

export default function TriviaGame({
  questions,
  onFinish,
  secondsPerQuestion = 15,
  scoreRecipients = [],
  onScoreChange,
}: Props) {
  const [current, setCurrent] = useState(0);
  const [time, setTime] = useState(secondsPerQuestion);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [recipientId, setRecipientId] = useState(scoreRecipients[0]?.id ?? "");
  const isGameNight = Boolean(onScoreChange && scoreRecipients.length > 0);
  const question = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const urgent = time <= Math.max(3, Math.ceil(secondsPerQuestion * 0.25));

  const next = useCallback(
    (finalScore: number) => {
      if (current + 1 >= questions.length) {
        onFinish(finalScore);
        return;
      }
      setCurrent((value) => value + 1);
      setAnswered(false);
      setSelectedAnswer(null);
      setTime(secondsPerQuestion);
    },
    [current, onFinish, questions.length, secondsPerQuestion],
  );

  useEffect(() => {
    if (answered) return;
    if (time === 0) {
      const timeout = window.setTimeout(() => next(score), 0);
      return () => window.clearTimeout(timeout);
    }
    const timer = window.setTimeout(() => setTime((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [time, answered, next, score]);

  function answer(index: number) {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(index);
    const correct = index === question.answer;
    const nextScore = isGameNight
      ? score + (correct ? 1 : -1)
      : correct
        ? score + 100 + time * 5
        : score;
    if (nextScore !== score) setScore(nextScore);
    const activeRecipientId = recipientId || scoreRecipients[0]?.id;
    if (isGameNight && activeRecipientId && onScoreChange) {
      onScoreChange(activeRecipientId, correct ? 1 : -1);
    }
    window.setTimeout(() => next(nextScore), 1500);
  }

  return (
    <div className="family-table-scene mx-auto max-w-4xl rounded-[2rem] p-4 pt-36 sm:p-6 sm:pt-40 md:p-8 md:pt-44">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-200/35 bg-black/25 text-amber-200 shadow-inner">
            <Crown size={20} />
          </span>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.28em] text-amber-200/70">
              Ronda premium
            </p>
            <p className="mt-0.5 text-sm font-black text-amber-50">
              Pregunta {current + 1} de {questions.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-black ${urgent ? "border-rose-300/45 bg-rose-500/15 text-rose-100" : "border-emerald-200/25 bg-black/25 text-emerald-100"}`}>
            <Clock3 size={15} /> {time}s
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-amber-200/30 bg-amber-300/10 px-3 py-2 text-sm font-black text-amber-100">
            <Trophy size={15} /> {score}
          </span>
        </div>
      </div>

      <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-black/30">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-200 to-amber-500 shadow-[0_0_16px_rgba(245,197,86,.45)] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <section className="rounded-[1.7rem] border border-white/10 bg-black/20 p-5 shadow-inner shadow-black/20 sm:p-7">
        <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[.26em] text-emerald-200/70">
          <Sparkles size={13} /> Elige la respuesta correcta
        </p>
        <h2 className="max-w-3xl text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
          {question.question}
        </h2>
      </section>

      {scoreRecipients.length > 1 && (
        <label className="mt-5 block rounded-2xl border border-amber-200/25 bg-black/20 p-4">
          <span className="block text-xs font-black uppercase tracking-[.18em] text-amber-100">
            ¿Quién responde?
          </span>
          <select
            value={recipientId}
            onChange={(event) => setRecipientId(event.target.value)}
            disabled={answered}
            className="mt-3 w-full rounded-xl border border-amber-200/20 bg-[#07150f] px-4 py-3 font-bold outline-none focus:border-amber-300"
          >
            {scoreRecipients.map((recipient) => (
              <option key={recipient.id} value={recipient.id}>
                {recipient.name}
              </option>
            ))}
          </select>
        </label>
      )}

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {question.options.map((option, index) => {
          const isCorrect = answered && index === question.answer;
          const isIncorrect = answered && selectedAnswer === index && !isCorrect;
          const muted = answered && !isCorrect && !isIncorrect;
          return (
            <button
              key={option}
              onClick={() => answer(index)}
              disabled={answered}
              className={`group flex min-h-20 items-center gap-4 rounded-2xl border p-4 text-left transition duration-200 ${
                isCorrect
                  ? "border-emerald-200/70 bg-emerald-500/30 shadow-[0_0_28px_rgba(52,211,153,.16)]"
                  : isIncorrect
                    ? "border-rose-300/60 bg-rose-500/25"
                    : muted
                      ? "border-white/5 bg-black/15 opacity-45"
                      : "border-amber-100/15 bg-[#10281d]/85 hover:-translate-y-0.5 hover:border-amber-200/45 hover:bg-[#173827]"
              }`}
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border font-black ${
                isCorrect
                  ? "border-emerald-100/60 bg-emerald-200 text-emerald-950"
                  : isIncorrect
                    ? "border-rose-100/60 bg-rose-200 text-rose-950"
                    : "border-amber-100/25 bg-black/25 text-amber-100 group-hover:border-amber-200/60"
              }`}>
                {isCorrect ? <Check size={20} /> : isIncorrect ? <X size={20} /> : optionLabels[index] ?? index + 1}
              </span>
              <span className="font-bold leading-snug text-slate-50">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
