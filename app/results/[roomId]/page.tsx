"use client";

import Link from "next/link";
import { Award, Coins, Gem, Home, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import AppLayout from "@/app/components/AppLayout";
import Avatar from "@/app/components/Avatar";
import EndOfMatchAd from "@/app/components/EndOfMatchAd";
import { useAuthContext } from "@/contexts/AuthContext";
import { db } from "@/firebase/config";
import { claimMatchReward, MatchReward } from "@/services/rewards";
import { getPlayer, Player } from "@/services/player";
import { Room } from "@/services/rooms";

export default function ResultsPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const { user } = useAuthContext();
  const [room, setRoom] = useState<Room | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [reward, setReward] = useState<MatchReward | null>(null);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => onSnapshot(doc(db, "rooms", roomId), async (snapshot) => {
    if (!snapshot.exists()) return;
    const data = snapshot.data() as Room;
    setRoom(data);
    const loaded = await Promise.all(data.players.map((uid) => getPlayer(uid)));
    setPlayers(loaded.filter((player): player is Player => player !== null));
  }), [roomId]);

  const ranking = useMemo(() => [...players].sort((a, b) => (room?.scores?.[b.uid] ?? 0) - (room?.scores?.[a.uid] ?? 0)), [players, room?.scores]);
  const myPosition = ranking.findIndex((player) => player.uid === user?.uid) + 1;
  const myScore = user ? room?.scores?.[user.uid] ?? 0 : 0;
  const alreadyClaimed = Boolean(
    user &&
      players
        .find((player) => player.uid === user.uid)
        ?.claimedRooms?.includes(roomId),
  );

  async function handleClaim() {
    if (!user || !myPosition) return;
    try {
      setClaiming(true);
      const nextReward = await claimMatchReward(roomId, user.uid, myPosition, myScore);
      setReward(nextReward);
    } finally {
      setClaiming(false);
    }
  }

  if (!room) return <AppLayout><div className="mesa-panel rounded-3xl p-10 text-center text-slate-400">Calculando resultados...</div></AppLayout>;

  return <AppLayout>
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="mesa-panel-gold overflow-hidden rounded-3xl text-center">
        <div className="h-2 bg-gradient-to-r from-amber-400 via-violet-500 to-cyan-400" />
        <div className="p-8 md:p-10">
          <Award className="mx-auto text-amber-300" size={44} />
          <p className="mt-4 text-xs font-bold uppercase tracking-[.28em] text-violet-300">Partida terminada</p>
          <h1 className="mt-2 text-4xl font-black">Resultados de la mesa</h1>
          <p className="mt-3 text-slate-400">Cada partida suma experiencia para tu próxima Game Night.</p>
        </div>
      </section>

      <section className="mesa-panel rounded-3xl p-5 md:p-7">
        <h2 className="text-xl font-black">Clasificación</h2>
        <div className="mt-5 space-y-3">
          {ranking.map((player, index) => <div key={player.uid} className={`flex items-center gap-4 rounded-2xl border p-4 ${index === 0 ? "border-amber-300/35 bg-amber-400/10" : "border-slate-700/70 bg-slate-950/55"}`}>
            <span className="w-7 text-center text-lg font-black text-slate-400">#{index + 1}</span>
            <Avatar avatar={player.avatar} photoURL={player.photoURL} name={player.displayName} size="sm" />
            <div className="min-w-0 flex-1"><p className="truncate font-bold">{player.displayName}</p><p className="text-sm text-slate-400">Nivel {player.level}</p></div>
            <span className="font-black text-amber-200">{room.scores?.[player.uid] ?? 0} pts</span>
          </div>)}
        </div>
      </section>

      {user && myPosition > 0 && <section className="mesa-panel rounded-3xl p-6 text-center">
        <Sparkles className="mx-auto text-violet-300" size={30} />
        <h2 className="mt-3 text-2xl font-black">Tu recompensa está lista</h2>
        {reward ? <div className="mt-4 flex justify-center gap-5 text-lg font-black"><span className="flex items-center gap-2 text-blue-200">+{reward.xp} XP</span><span className="flex items-center gap-2 text-amber-200"><Coins size={18} /> +{reward.coins}</span><span className="flex items-center gap-2 text-fuchsia-200"><Gem size={18} /> +{reward.gems}</span></div> : alreadyClaimed ? <p className="mt-4 font-bold text-emerald-200">Recompensa guardada en tu perfil.</p> : <button onClick={handleClaim} disabled={claiming} className="mt-5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 px-6 py-3 font-black disabled:opacity-50">{claiming ? "Guardando..." : "Reclamar recompensa"}</button>}
      </section>}

      <EndOfMatchAd placement="game-night-results" />

      <Link href="/dashboard" className="mx-auto flex w-fit items-center gap-2 text-sm font-bold text-slate-300 hover:text-white"><Home size={17} /> Volver a La Mesa</Link>
    </div>
  </AppLayout>;
}
