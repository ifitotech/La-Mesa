"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, MoreVertical, Trophy } from "lucide-react";
import Link from "next/link";

import { useDominoSocket } from "@/hooks/useDominoSocket";
import { dominoService } from "@/services/domino";

import { DominoBoard } from "@/app/components/DominoBoard";
import { DominoHand } from "@/app/components/DominoHand";
import { DominoPlayers } from "@/app/components/DominoPlayers";

export default function TablePage() {
  const { id } = useParams<{
    id: string;
  }>();

  useDominoSocket();
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;

    dominoService.joinRoom(id);

    return () => {
      dominoService.leave(id);
    };
  }, [id]);

  return (
    <main className="min-h-screen bg-[#050b12] p-4 text-white md:p-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <header className="mesa-panel-gold flex items-center justify-between rounded-2xl px-4 py-3">
          <Link href="/lobby" className="mesa-action !p-2"><ArrowLeft size={20} /></Link>
          <div className="text-center"><p className="text-xs text-slate-400">Mesa</p><h1 className="font-black">#{id.slice(0, 6).toUpperCase()}</h1></div>
          <div className="relative"><button onClick={() => setMenuOpen((value) => !value)} aria-label="Opciones de mesa" className="mesa-action !p-2"><MoreVertical size={20} /></button>{menuOpen && <div className="absolute right-0 top-11 z-20 w-44 rounded-xl border border-slate-700 bg-slate-950 p-2 shadow-xl"><button onClick={async () => { await navigator.clipboard.writeText(id); setCopied(true); }} className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-800">{copied ? "Código copiado" : "Copiar código"}</button><Link href="/lobby" className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-800">Volver a salas</Link></div>}</div>
        </header>
        <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
          <section className="mesa-panel-gold rounded-3xl p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-300">Partida en curso</p><h2 className="mt-1 text-2xl font-black">Dominó</h2></div><Trophy className="text-amber-300" /></div>
            <DominoPlayers />
            <div className="my-4"><DominoBoard /></div>
            <p className="mb-2 text-center text-sm text-slate-400">Tu mano · elige una ficha para jugar</p>
            <DominoHand />
          </section>
          <aside className="mesa-panel rounded-3xl p-5"><h2 className="font-black">Mesa privada</h2><p className="mt-2 text-sm leading-6 text-slate-400">Invita a tus amigos y mantén la racha. Las recompensas se suman al finalizar.</p><div className="mt-6 rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4 text-sm text-violet-100">Turnos, fichas y puntaje se actualizan en tiempo real.</div></aside>
        </div>
      </div>
    </main>
  );
}
