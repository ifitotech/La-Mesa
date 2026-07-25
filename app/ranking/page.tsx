"use client";

import { useEffect, useState } from "react";

import { getRanking } from "@/services/ranking";

export default function RankingPage() {
  const [players, setPlayers] = useState<
    Awaited<ReturnType<typeof getRanking>>
  >([]);

  useEffect(() => {
    getRanking().then(setPlayers);
  }, []);

  return (
    <div className="mx-auto max-w-3xl p-8">

      <h1 className="mb-8 text-4xl font-bold">
        Ranking Global
      </h1>

      <div className="space-y-3">
        {players.map((player, i) => (
          <div
            key={player.uid}
            className="flex justify-between rounded-xl bg-slate-900 p-4"
          >
            <span>
              #{i + 1} {player.displayName}
            </span>

            <span>{player.xp} XP</span>
          </div>
        ))}
      </div>

    </div>
  );
}
