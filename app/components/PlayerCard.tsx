"use client";

import { Coins, Flame, Gem, Trophy } from "lucide-react";

import Avatar from "@/app/components/Avatar";
import XPBar from "@/app/components/XPBar";
import { getLevelInfo } from "@/services/level";

type PlayerCardProps = {
  name: string;
  country: string;
  level: number;
  xp: number;
  coins: number;
  gems: number;
  streak: number;
  ranking: number;
  avatar?: string;
  photoURL?: string;
};

export default function PlayerCard({
  name,
  country,
  level,
  xp,
  coins,
  gems,
  streak,
  ranking,
  avatar,
  photoURL,
}: PlayerCardProps) {
  const levelInfo = getLevelInfo(level);

  return (
    <div className="mesa-panel-gold overflow-hidden rounded-3xl p-6 md:p-7">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-6">
          <div className="hidden h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-4xl">
            👤
          </div>

          <Avatar avatar={avatar} photoURL={photoURL} name={name} size="lg" />

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
              Perfil de jugador
            </p>

            <h2 className="mt-1 text-3xl font-black md:text-4xl">
              {name} {country}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {levelInfo.title} · Nivel {level}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-700/70 bg-slate-950/55 p-3 text-center">
            <Coins className="mx-auto mb-2 text-yellow-400" />
            <p className="text-2xl font-bold">{coins}</p>
            <p className="text-sm text-slate-400">
              Monedas
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-950/55 p-3 text-center">
            <Gem className="mx-auto mb-2 text-cyan-400" />
            <p className="text-2xl font-bold">{gems}</p>
            <p className="text-sm text-slate-400">
              Gemas
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-950/55 p-3 text-center">
            <Flame className="mx-auto mb-2 text-orange-400" />
            <p className="text-2xl font-bold">{streak}</p>
            <p className="text-sm text-slate-400">
              Racha
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-950/55 p-3 text-center">
            <Trophy className="mx-auto mb-2 text-amber-400" />
            <p className="text-2xl font-bold">
              #{ranking}
            </p>
            <p className="text-sm text-slate-400">
              Ranking
            </p>
          </div>
        </div>
      </div>

      <XPBar
        currentXP={xp}
        requiredXP={levelInfo.requiredXP}
      />
    </div>
  );
}
