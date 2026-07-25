import { type GameId } from "@/lib/game-catalog";
import Image from "next/image";

const artwork: Record<GameId, { emoji: string; label: string; colors: string; image?: string }> = {
  trivia: { emoji: "🧠", label: "Preguntas", colors: "from-violet-600 via-fuchsia-700 to-slate-950" },
  bible: { emoji: "📖", label: "Biblia", colors: "from-amber-400 via-orange-600 to-stone-950" },
  domino: { emoji: "🎲", label: "Dominó", colors: "from-cyan-500 via-blue-700 to-slate-950", image: "/game-domino-banner.png" },
  "heads-up": { emoji: "💡", label: "Pistas", colors: "from-orange-500 via-rose-600 to-slate-950" },
  bingo: { emoji: "🔢", label: "Bingo", colors: "from-emerald-500 via-teal-700 to-slate-950" },
  parchis: { emoji: "🎲", label: "Parchís", colors: "from-amber-400 via-orange-700 to-slate-950" },
  cards: { emoji: "🂡", label: "Cartas", colors: "from-rose-500 via-red-700 to-slate-950" },
  couples: { emoji: "💞", label: "Parejas", colors: "from-pink-500 via-rose-700 to-slate-950" },
  memory: { emoji: "🃏", label: "Memoria", colors: "from-sky-500 via-indigo-700 to-slate-950" },
  charades: { emoji: "🎭", label: "Mímica", colors: "from-yellow-400 via-orange-700 to-slate-950" },
  challenges: { emoji: "🔥", label: "Retos", colors: "from-fuchsia-500 via-rose-700 to-slate-950" },
};

const englishLabels: Partial<Record<GameId, string>> = { trivia: "Trivia", bible: "Bible", domino: "Dominoes", parchis: "Parcheesi", cards: "Cards", couples: "Couples", memory: "Memory", charades: "Charades", challenges: "Challenges" };

export default function GameArtwork({ gameId, className = "", english = false }: { gameId: GameId; className?: string; english?: boolean }) {
  const item = artwork[gameId];
  return <div className={`relative flex min-h-32 w-[38%] max-w-36 shrink-0 flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${item.colors} ${className}`}>{item.image && <Image src={item.image} alt="" fill className="object-cover opacity-90" />}<span className="absolute inset-0 bg-gradient-to-r from-slate-950/10 to-slate-950/50" /><span className="absolute -right-5 -top-7 text-9xl opacity-25">{item.emoji}</span><span className="relative text-5xl drop-shadow-lg">{item.emoji}</span><span className="relative mt-2 text-[10px] font-black uppercase tracking-[.18em] text-white/90">{english ? englishLabels[gameId] ?? item.label : item.label}</span></div>;
}
