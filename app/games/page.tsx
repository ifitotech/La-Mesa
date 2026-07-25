"use client";

import { ArrowRight, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import AppLayout from "@/app/components/AppLayout";
import { gameCatalog } from "@/lib/game-catalog";
import { useCountry } from "@/contexts/CountryContext";

export default function GamesPage() {
  const router = useRouter();
  const { country } = useCountry();

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
              Elige el momento
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
              Juegos para toda la mesa
            </h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Cada juego es un módulo independiente que comparte tu perfil,
              recompensas y la misma Game Night.
            </p>
          </div>

          <button
            onClick={() => router.push("/lobby")}
            className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500"
          >
            Crear una Game Night
          </button>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {gameCatalog.map((game) => {
            const Icon = game.icon;
            const available = game.status === "available";

            return (
              <article
                key={game.id}
                className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900"
              >
                <div className={`h-2 bg-gradient-to-r ${game.accent}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className={`rounded-2xl bg-gradient-to-br ${game.accent} p-3 text-white`}>
                      <Icon size={28} />
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${available ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-800 text-slate-400"}`}>
                      {available ? "Disponible" : "Próximamente"}
                    </span>
                  </div>

                  <h2 className="mt-6 text-2xl font-bold">{game.id === "trivia" ? country.triviaName : game.name}</h2>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
                    {game.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-5 text-sm text-slate-400">
                    <span className="flex items-center gap-2"><Users size={16} /> {game.minPlayers}-{game.maxPlayers} jugadores</span>
                    {available ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => router.push(`/play/${game.id}`)}
                          className="font-semibold text-slate-300 hover:text-white"
                        >
                          {game.gameNight ? "Practicar" : "Jugar ahora"}
                        </button>
                        {game.gameNight && <button
                          onClick={() => router.push(game.gameNight ? `/lobby?game=${game.id}` : `/play/${game.id}`)}
                          className="flex items-center gap-1 font-semibold text-white hover:text-blue-300"
                        >
                          Game Night <ArrowRight size={16} />
                        </button>}
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </AppLayout>
  );
}
