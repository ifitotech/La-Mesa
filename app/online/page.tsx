import Link from "next/link";
import { KeyRound, Radio, UsersRound } from "lucide-react";

import AppLayout from "@/app/components/AppLayout";
import GameModeCatalog from "@/app/components/GameModeCatalog";

export default function OnlineGamesPage() {
  return <AppLayout><div className="mx-auto max-w-7xl space-y-8"><section className="mesa-panel-gold rounded-3xl p-7 md:p-10"><Radio className="text-emerald-300" size={36} /><p className="mt-5 text-xs font-bold uppercase tracking-[.25em] text-emerald-300">En línea · Con amigos</p><h1 className="mt-2 text-4xl font-black md:text-5xl">Juegos Online</h1><p className="mt-4 max-w-2xl text-slate-300">Elige un juego y pulsa Jugar ahora: crearemos una partida privada con un código para compartir. No modifica tu Game Night presencial.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/tables/join" className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-5 py-3 font-bold text-emerald-100 hover:bg-emerald-500/25"><KeyRound size={18} /> Tengo un código</Link><Link href="/lobby" className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-5 py-3 font-bold hover:bg-slate-800"><UsersRound size={18} /> Crear partida</Link></div></section><GameModeCatalog mode="online" /></div></AppLayout>;
}
