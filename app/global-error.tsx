"use client";

import "./globals.css";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="es">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-[#050b12] px-4 text-white">
          <section className="mesa-panel-gold w-full max-w-lg rounded-3xl p-8 text-center">
            <p className="text-xs font-black uppercase tracking-[.24em] text-amber-300">La Mesa</p>
            <h1 className="mt-3 text-3xl font-black">Necesitamos recargar la aplicación</h1>
            <p className="mt-3 text-slate-300">Ocurrió un error inesperado. Puedes recuperarte sin cerrar el navegador.</p>
            <button onClick={() => unstable_retry()} className="mt-7 rounded-xl bg-blue-600 px-6 py-3 font-black hover:bg-blue-500">
              Recargar La Mesa
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
