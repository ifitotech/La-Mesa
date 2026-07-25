"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { getSafeInternalPath } from "@/lib/safe-navigation";
import { loginWithGoogle, registerUser } from "@/services/auth";

type FormData = { email: string; password: string };

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function continueAfterRegister() {
    const next = new URLSearchParams(window.location.search).get("next");
    const destination = getSafeInternalPath(next, "");
    if (destination) {
      window.localStorage.setItem("la-mesa-after-auth", destination);
    }
    router.push("/onboarding");
  }

  async function onSubmit(data: FormData) {
    try {
      setLoading(true);
      setMessage("");
      await registerUser(data.email, data.password);
      continueAfterRegister();
    } catch (error: unknown) {
      setMessage(
        error instanceof Error ? error.message : "No se pudo crear la cuenta.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      setMessage("");
      await loginWithGoogle();
      continueAfterRegister();
    } catch (error: unknown) {
      setMessage(
        error instanceof Error
          ? error.message
          : "No se pudo registrar con Google.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050b12] px-4 py-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(41,98,255,.25),transparent_28rem),radial-gradient(circle_at_12%_85%,rgba(124,58,237,.18),transparent_30rem)]" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mesa-panel relative w-full max-w-md rounded-3xl p-6 shadow-2xl sm:p-8"
      >
        <div className="text-center">
          <Image src="/la-mesa-logo-v2.png" alt="La Mesa" width={88} height={88} priority className="mx-auto h-[88px] w-[88px] rounded-2xl border border-blue-200/35 object-cover shadow-xl shadow-blue-950/70" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[.28em] text-blue-300">La Mesa · Game Night</p>
          <h1 className="mt-2 text-3xl font-black">Crea tu cuenta</h1>
          <p className="mt-2 text-sm text-slate-400">Tu mesa, tus juegos y tus recompensas en un solo lugar.</p>
        </div>

        <label className="mt-7 block text-sm font-bold text-slate-300">
          Correo electrónico
          <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/70 px-4 focus-within:border-blue-400">
            <Mail size={18} className="text-blue-300" />
            <input type="email" autoComplete="email" placeholder="tu@correo.com" aria-invalid={Boolean(errors.email)} {...register("email", { required: "Escribe tu correo electrónico." })} className="w-full border-0 bg-transparent py-3 outline-none" />
          </span>
        </label>
        {errors.email && <p role="alert" className="mt-2 text-sm text-rose-300">{errors.email.message}</p>}

        <label className="mt-4 block text-sm font-bold text-slate-300">
          Contraseña
          <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/70 px-4 focus-within:border-blue-400">
            <LockKeyhole size={18} className="text-blue-300" />
            <input type="password" autoComplete="new-password" placeholder="Mínimo 6 caracteres" aria-invalid={Boolean(errors.password)} {...register("password", { required: "Crea una contraseña.", minLength: { value: 6, message: "Usa al menos 6 caracteres." } })} className="w-full border-0 bg-transparent py-3 outline-none" />
          </span>
        </label>
        {errors.password && <p role="alert" className="mt-2 text-sm text-rose-300">{errors.password.message}</p>}

        <button disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 py-3.5 font-black shadow-lg shadow-blue-950/50 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "Creando..." : <>Crear cuenta <ArrowRight size={18} /></>}
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-slate-500"><span className="h-px flex-1 bg-slate-700" />o continúa con<span className="h-px flex-1 bg-slate-700" /></div>
        <button type="button" onClick={() => void handleGoogleLogin()} disabled={loading} className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-600 bg-white/5 py-3.5 font-bold text-white transition hover:border-blue-300 hover:bg-blue-500/10 disabled:opacity-50">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-black text-red-500">G</span>
          Registrarme con Google
        </button>

        {message && <p role="alert" className="mt-4 rounded-xl bg-rose-500/10 p-3 text-center text-sm text-rose-200">{message}</p>}

        <p className="mt-6 text-center text-sm text-slate-400">
          ¿Ya tienes cuenta? <Link href="/auth/login" className="font-bold text-blue-300 hover:text-blue-200">Iniciar sesión</Link>
        </p>
      </form>
    </main>
  );
}
