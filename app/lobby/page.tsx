"use client";

import { ArrowLeft, CirclePlus, KeyRound, Sparkles } from "lucide-react";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import AppLayout from "@/app/components/AppLayout";
import { useAuthContext } from "@/contexts/AuthContext";
import { createRoom, joinRoomByCode } from "@/services/rooms";
import { getGameDefinition, type GameId } from "@/lib/game-catalog";

function LobbyContent() {
  const { user } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedGame: GameId = searchParams.get("game") === "domino" ? "domino" : "trivia";
  const game = getGameDefinition(selectedGame);
  const Icon = game.icon;
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      router.push(`/play/${selectedGame}`);
      return;
    }
    try {
      setLoading(true); setError("");
      const roomId = await createRoom(user.uid, selectedGame);
      router.push(`/lobby/${roomId}`);
    } catch (err) {
      setError("No se pudo crear la Game Night."); console.error(err);
    } finally { setLoading(false); }
  }

  async function handleJoinRoom() {
    if (!user) {
      setError("Para unirte a una mesa con amigos, configura Firebase e inicia sesión.");
      return;
    }

    if (!roomCode.trim()) return;
    try {
      setLoading(true); setError("");
      const roomId = await joinRoomByCode(roomCode.trim(), user.uid);
      router.push(`/lobby/${roomId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo unir a la mesa.");
    } finally { setLoading(false); }
  }

  return <AppLayout>
    <div className="mx-auto max-w-5xl space-y-6">
      <button onClick={() => router.push("/games")} className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white"><ArrowLeft size={17} /> Todos los juegos</button>
      <section className="mesa-panel-gold overflow-hidden rounded-3xl">
        <div className={`h-2 bg-gradient-to-r ${game.accent}`} />
        <div className="grid gap-8 p-6 md:grid-cols-[1.05fr_.95fr] md:p-9">
          <div>
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${game.accent} shadow-lg`}><Icon size={31} /></div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[.24em] text-violet-300">Game Night</p>
            <h1 className="mt-2 text-4xl font-black">{game.name}</h1>
            <p className="mt-3 max-w-md leading-7 text-slate-300">{game.description}</p>
            <div className="mt-7 flex items-center gap-2 text-sm text-slate-400"><Sparkles size={16} className="text-amber-300" /> {game.minPlayers}-{game.maxPlayers} jugadores · recompensas activas</div>
          </div>
          <div className="rounded-2xl border border-slate-700/80 bg-slate-950/65 p-5">
            <p className="text-sm font-bold">Crea una mesa privada</p>
            <p className="mt-1 text-sm text-slate-400">Juega ahora sin buscar partidas. Con una cuenta podrás invitar amigos con un código.</p>
            <button onClick={handleCreateRoom} disabled={loading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 py-3.5 font-black disabled:opacity-50"><CirclePlus size={20} /> {loading ? "Creando..." : user ? "Crear Game Night" : "Jugar ahora"}</button>
            <div className="my-6 border-t border-slate-700/70" />
            <label className="text-sm font-bold">¿Tienes un código?</label>
            <input value={roomCode} onChange={(event) => setRoomCode(event.target.value.toUpperCase())} placeholder="ABC123" maxLength={6} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-center text-2xl font-black tracking-[.3em] outline-none focus:border-violet-400" />
            <button onClick={handleJoinRoom} disabled={loading || !roomCode.trim()} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/15 py-3 font-bold text-emerald-100 hover:bg-emerald-500/25 disabled:opacity-40"><KeyRound size={18} /> Unirse a la mesa</button>
            {error && <p className="mt-3 text-center text-sm text-rose-300">{error}</p>}
          </div>
        </div>
      </section>
    </div>
  </AppLayout>;
}

export default function LobbyPage() {
  return <Suspense fallback={<AppLayout><div className="mesa-panel rounded-3xl p-10 text-center text-slate-400">Preparando tu Game Night...</div></AppLayout>}><LobbyContent /></Suspense>;
}
