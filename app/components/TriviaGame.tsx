"use client";

import { useCallback, useEffect, useState } from "react";

import { Question } from "@/services/questions";

type TriviaQuestion = Pick<
  Question,
  "id" | "question" | "options" | "answer"
>;

type Props = {
  questions: TriviaQuestion[];
  onFinish(score: number): void;
  secondsPerQuestion?: number;
  scoreRecipients?: { id: string; name: string }[];
  onScoreChange?: (recipientId: string, change: number) => void;
};

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
  const [recipientId, setRecipientId] = useState(scoreRecipients[0]?.id ?? "");

  const question = questions[current];

  const next = useCallback(() => {
    if (current + 1 >= questions.length) {
      onFinish(score);
      return;
    }

    setCurrent((value) => value + 1);
    setAnswered(false);
    setTime(secondsPerQuestion);
  }, [current, onFinish, questions.length, score, secondsPerQuestion]);

  useEffect(() => {
    if (answered) return;

    if (time === 0) {
      const timeout = window.setTimeout(next, 0);
      return () => window.clearTimeout(timeout);
    }

    const timer = setTimeout(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, answered, next]);

  function answer(index: number) {
    if (answered) return;

    setAnswered(true);

    if (index === question.answer) {
      setScore((s) => s + 100 + time * 5);
    }

    if (scoreRecipients.length && recipientId && onScoreChange) {
      onScoreChange(recipientId, index === question.answer ? 1 : -1);
    }

    setTimeout(next, 1500);
  }

  return (
    <div className="mx-auto max-w-3xl">

      <div className="mb-6 flex justify-between">
        <span>
          {current + 1}/{questions.length}
        </span>

        <span>{time}s</span>

        <span>{score} pts</span>
      </div>

      <h2 className="mb-8 text-3xl font-bold">
        {question.question}
      </h2>

      {scoreRecipients.length > 0 && <label className="mb-5 block rounded-2xl border border-amber-300/35 bg-amber-400/10 p-4"><span className="block text-sm font-black text-amber-200">¿Quién responde esta pregunta?</span><select value={recipientId} onChange={(event) => setRecipientId(event.target.value)} disabled={answered} className="mt-3 w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 font-bold outline-none focus:border-amber-300">{scoreRecipients.map((recipient) => <option key={recipient.id} value={recipient.id}>{recipient.name}</option>)}</select><span className="mt-2 block text-xs text-slate-400">Correcta: +1 punto · Incorrecta: −1 punto</span></label>}

      <div className="grid gap-4">

        {question.options.map((option, index) => {

          let color =
            "bg-slate-800 hover:bg-slate-700";

          if (answered) {
            if (index === question.answer) {
              color = "bg-green-600";
            } else {
              color = "bg-red-600";
            }
          }

          return (
            <button
              key={index}
              onClick={() => answer(index)}
              disabled={answered}
              className={`rounded-2xl p-5 text-left font-semibold transition ${color}`}
            >
              {option}
            </button>
          );
        })}

      </div>


    </div>
  );
}
