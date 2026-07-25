"use client";

import { KeyRound, UsersRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { useAuthContext } from "@/contexts/AuthContext";
import { joinRoomByCode } from "@/services/rooms";

export default function JoinTablePage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function joinTable() {
    if (!user || !code.trim()) return;
    try {
      setLoading(true); setError("");
      const roomId = await joinRoomByCode(code.trim(), user.uid);
      router.push(`/lobby/${roomId}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudo unir a la mesa.");
    } finally { setLoading(false); }
  }

  return <AppLayout>
    <div className="mx-auto max-w-xl">
      <section className="mesa-panel-gold rounded-3xl p-7 text-center md:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-700 shadow-lg"><UsersRound size={30} /></span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[.25em] text-violet-300">Game Night</p>
        <h1 className="mt-2 text-4xl font-black">Unirse a una mesa</h1>
        <p className="mx-auto mt-3 max-w-sm text-slate-400">Pide el código a tu anfitrión y entra directamente a la reunión.</p>
        <input value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} placeholder="ABC123" maxLength={6} className="mt-8 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-center text-3xl font-black tracking-[.35em] outline-none focus:border-violet-400" />
        <button onClick={joinTable} disabled={loading || !code.trim()} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-700 py-3.5 font-black disabled:opacity-50"><KeyRound size={20} /> {loading ? "Uniéndote..." : "Unirse a la mesa"}</button>
        {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}
      </section>
    </div>
  </AppLayout>;
}
