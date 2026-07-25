"use client";

import Link from "next/link";
import { House, RefreshCw, TriangleAlert } from "lucide-react";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Error recuperable de La Mesa:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#050b12] px-4 py-12 text-white">
      <section className="mesa-panel-gold w-full max-w-xl rounded-3xl p-8 text-center">
        <TriangleAlert className="mx-auto text-amber-300" size={48} />
        <p className="mt-5 text-xs font-black uppercase tracking-[.24em] text-amber-300">Algo interrumpió la partida</p>
        <h1 className="mt-2 text-3xl font-black">No pudimos cargar esta pantalla</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-300">
          Puede ser un problema temporal de conexión. Tus datos guardados no se han eliminado.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={() => unstable_retry()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-black hover:bg-blue-500">
            <RefreshCw size={18} /> Intentar de nuevo
          </button>
          <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-5 py-3 font-black hover:bg-slate-800">
            <House size={18} /> Volver al inicio
          </Link>
        </div>
        {error.digest && <p className="mt-5 text-xs text-slate-500">Referencia: {error.digest}</p>}
      </section>
    </main>
  );
}
