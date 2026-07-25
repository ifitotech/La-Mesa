"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Avatar from "./Avatar";
import TriviaGame from "./TriviaGame";

import { doc, onSnapshot } from "firebase/firestore";

import { db } from "@/firebase/config";
import { getPlayer, Player } from "@/services/player";
import {
  Room,
  startRoom,
  submitTriviaScore,
} from "@/services/rooms";
import { useAuthContext } from "@/contexts/AuthContext";
import { getGameDefinition } from "@/lib/game-catalog";
import { getLocalizedTrivia } from "@/lib/country-content";

type Props = {
  roomId: string;
};

export default function Lobby({ roomId }: Props) {
  const { user } = useAuthContext();

  const [room, setRoom] = useState<Room | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [copied, setCopied] = useState(false);
  const [triviaFinished, setTriviaFinished] = useState(false);
  const [triviaScore, setTriviaScore] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "rooms", roomId),
      async (snapshot) => {
        if (!snapshot.exists()) return;

        const data = snapshot.data() as Room;

        setRoom(data);

        const users = await Promise.all(
          data.players.map((uid) => getPlayer(uid))
        );

        setPlayers(
          users.filter(
            (player): player is Player => player !== null
          )
        );
      }
    );

    return unsubscribe;
  }, [roomId]);

  async function copyCode() {
    if (!room) return;

    await navigator.clipboard.writeText(room.code);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  if (!room) {
    return (
      <div className="mesa-panel rounded-3xl p-6">
        Cargando sala...
      </div>
    );
  }

  async function handleTriviaFinish(score: number) {
    if (!user) return;

    await submitTriviaScore(roomId, user.uid, score);
    setTriviaScore(score);
    setTriviaFinished(true);
  }

  const game = getGameDefinition(room.game);
  const currentPlayer = players.find((player) => player.uid === user?.uid);

  if (room.game === "trivia" && room.status === "playing") {
    return (
      <section className="mesa-panel-gold rounded-3xl p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              Trivia localizada
            </p>
            <h1 className="mt-1 text-3xl font-black">{game.name}</h1>
          </div>
          <span className="rounded-full bg-violet-500/15 px-3 py-1 text-sm font-semibold text-violet-200">
            {currentPlayer?.country ?? "Latinoamérica"}
          </span>
        </div>

        {triviaFinished ? (
          <div className="rounded-2xl border border-slate-700/80 bg-slate-950/80 p-8 text-center">
            <h2 className="text-3xl font-black">¡Ronda terminada!</h2>
            <p className="mt-3 text-slate-400">
              Tus resultados y recompensas se guardarán al cerrar la ronda.
            </p>
            {triviaScore !== null && (
              <p className="mt-4 text-2xl font-black text-amber-300">
                {triviaScore} puntos
              </p>
            )}
            <Link
              href={`/results/${roomId}`}
              className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 px-5 py-3 font-bold hover:from-violet-500 hover:to-purple-600"
            >
              Ver resultados
            </Link>
          </div>
        ) : (
          <TriviaGame
            questions={getLocalizedTrivia(currentPlayer?.country ?? "CU")}
            onFinish={handleTriviaFinish}
          />
        )}
      </section>
    );
  }

  return (
    <div className="mesa-panel-gold rounded-3xl p-6 md:p-8">

      <h1 className="text-3xl font-bold text-center">
        {game.name} · Game Night
      </h1>

      <div className="mt-8 rounded-2xl border border-amber-200/15 bg-slate-950/75 p-6">

        <p className="text-center text-slate-400">
          Código de la sala
        </p>

        <h2 className="mt-2 text-center text-5xl font-black tracking-[0.4em]">
          {room.code}
        </h2>

        <button
          onClick={copyCode}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 py-3 font-bold hover:from-violet-500 hover:to-purple-600"
        >
          {copied ? "✅ Copiado" : "📋 Copiar código"}
        </button>

      </div>

      <div className="mt-8 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Jugadores
        </h2>

        <span className="rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm">
          {players.length}/{room.maxPlayers}
        </span>

      </div>

      <div className="mt-4 space-y-3">

        {players.map((player) => (
          <div
            key={player.uid}
            className="flex items-center justify-between rounded-2xl border border-slate-700/80 bg-slate-950/65 p-4"
          >
            <div className="flex items-center gap-4">

              <Avatar
                avatar={player.avatar}
                photoURL={player.photoURL}
                name={player.displayName}
                size="md"
              />

              <div>
                <p className="font-semibold">
                  {player.displayName}
                </p>

                <p className="text-sm text-slate-400">
                  Nivel {player.level}
                </p>
              </div>

            </div>

            {player.uid === room.host && (
              <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-sm font-semibold text-yellow-400">
                👑 Host
              </span>
            )}

          </div>
        ))}

      </div>

      {user?.uid === room.host &&
        room.status === "waiting" && (
          <button
            onClick={() => startRoom(roomId)}
            className="mt-8 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-700 py-4 text-lg font-bold hover:from-emerald-400 hover:to-green-600"
          >
            ▶ Iniciar partida
          </button>
        )}

    </div>
  );
}
