import Link from "next/link";
import { ArrowLeft, Gamepad2 } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050b12] px-4 py-12 text-white">
      <section className="mesa-panel-gold w-full max-w-xl rounded-3xl p-8 text-center">
        <p className="text-7xl font-black text-blue-300">404</p>
        <Gamepad2 className="mx-auto mt-5 text-violet-300" size={42} />
        <h1 className="mt-4 text-3xl font-black">Esta mesa no existe</h1>
        <p className="mt-3 text-slate-300">El enlace puede haber cambiado o la partida ya terminó.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-black hover:bg-blue-500"><ArrowLeft size={18} /> Volver al inicio</Link>
          <Link href="/games" className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-5 py-3 font-black hover:bg-slate-800">Ver juegos</Link>
        </div>
      </section>
    </main>
  );
}
