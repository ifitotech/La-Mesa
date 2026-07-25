"use client";

import { ArrowRight, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import GameArtwork from "@/app/components/GameArtwork";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCountry } from "@/contexts/CountryContext";
import {
  gameCatalog,
  getGameCopy,
  isGameAvailableOnline,
  isGameEnabledForCountry,
  type GameId,
} from "@/lib/game-catalog";
import { createRoom } from "@/services/rooms";

type Props = { mode: "game-night" | "online" };

export default function GameModeCatalog({ mode }: Props) {
  const router = useRouter();
  const { country, isEnglish } = useCountry();
  const { user } = useAuthContext();
  const [creatingGame, setCreatingGame] = useState<GameId | null>(null);
  const [error, setError] = useState("");
  const online = mode === "online";

  const games = gameCatalog
    .filter(
      (game) =>
        isGameEnabledForCountry(game.id, country.code) &&
        (online ? game.gameNight : true),
    )
    .sort((a, b) => {
      if (a.id === "trivia") return -1;
      if (b.id === "trivia") return 1;
      const aBeta = a.status === "beta";
      const bBeta = b.status === "beta";
      return aBeta === bBeta ? 0 : aBeta ? 1 : -1;
    });

  async function playOnline(gameId: GameId) {
    if (!user) {
      router.push("/auth/login?next=/online");
      return;
    }

    try {
      setCreatingGame(gameId);
      setError("");
      const roomId = await createRoom(user.uid, gameId);
      router.push(`/lobby/${roomId}`);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "No se pudo crear la partida online.",
      );
    } finally {
      setCreatingGame(null);
    }
  }

  return (
    <section>
      {error && (
        <p
          role="status"
          className="mb-4 rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
        >
          {error}
        </p>
      )}
      <div className="grid gap-3 lg:grid-cols-2">
        {games.map((game) => {
          const playable =
            game.status !== "coming-soon" &&
            (!online || isGameAvailableOnline(game.id));
          const isBeta = game.status === "beta";
          const isCreating = creatingGame === game.id;
          const copy = getGameCopy(game, isEnglish);

          return (
            <article
              key={game.id}
              className="mesa-panel group flex overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-amber-200/45 hover:shadow-[0_24px_55px_rgba(0,0,0,.42)]"
            >
              <GameArtwork gameId={game.id} english={isEnglish} />
              <div className="min-w-0 flex-1 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-black">
                      {game.id === "trivia" ? country.triviaName : copy.name}
                    </h2>
                    <p className="mt-1 text-sm leading-5 text-slate-400">
                      {copy.description}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${
                      isBeta && playable
                        ? "bg-amber-400/15 text-amber-200"
                        : playable
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {isBeta && playable
                      ? "Beta Test"
                      : playable
                        ? isEnglish
                          ? "Available"
                          : "Disponible"
                        : isEnglish
                          ? "Coming soon"
                          : "Próximamente"}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-amber-100/10 pt-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Users size={13} /> {game.minPlayers}-{game.maxPlayers}
                  </span>
                  {playable && (
                    <button
                      onClick={() =>
                        online
                          ? void playOnline(game.id)
                          : router.push(`/play/${game.id}`)
                      }
                      disabled={creatingGame !== null}
                      className="mesa-action inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-black disabled:opacity-50"
                    >
                      {online && isCreating
                        ? isEnglish
                          ? "Creating..."
                          : "Creando..."
                        : online
                          ? isEnglish
                            ? "Play now"
                            : "Jugar ahora"
                          : isEnglish
                            ? "Play"
                            : "Jugar"}{" "}
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
