"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  loginUser,
  loginWithGoogle,
  requestPasswordReset,
} from "@/services/auth";

type FormData = { email: string; password: string };

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, getValues } = useForm<FormData>();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function continueAfterLogin() {
    const next = new URLSearchParams(window.location.search).get("next");
    if (next?.startsWith("/")) {
      window.localStorage.setItem("la-mesa-after-auth", next);
    }
    router.push("/onboarding");
  }

  async function onSubmit(data: FormData) {
    try {
      setLoading(true);
      setMessage("");
      setSuccess(false);
      await loginUser(data.email, data.password);
      continueAfterLogin();
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      setMessage("");
      setSuccess(false);
      await loginWithGoogle();
      continueAfterLogin();
    } catch (error: unknown) {
      setMessage(
        error instanceof Error
          ? error.message
          : "No se pudo iniciar sesión con Google.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordReset() {
    try {
      setLoading(true);
      setMessage("");
      setSuccess(false);
      await requestPasswordReset(getValues("email") ?? "");
      setSuccess(true);
      setMessage("Te enviamos un enlace para restablecer tu contraseña.");
    } catch (error: unknown) {
      setMessage(
        error instanceof Error
          ? error.message
          : "No pudimos enviar el correo de recuperación.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050b12] px-4 py-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(41,98,255,.25),transparent_28rem),radial-gradient(circle_at_88%_85%,rgba(124,58,237,.18),transparent_30rem)]" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mesa-panel relative w-full max-w-md rounded-3xl p-6 shadow-2xl sm:p-8"
      >
        <div className="text-center">
          <Image
            src="/la-mesa-logo-v2.png"
            alt="La Mesa"
            width={88}
            height={88}
            priority
            className="mx-auto h-[88px] w-[88px] rounded-2xl border border-blue-200/35 object-cover shadow-xl shadow-blue-950/70"
          />
          <p className="mt-5 text-xs font-bold uppercase tracking-[.28em] text-blue-300">
            La Mesa · Game Night
          </p>
          <h1 className="mt-2 text-3xl font-black">Bienvenido de vuelta</h1>
          <p className="mt-2 text-sm text-slate-400">
            Entra para jugar, invitar y guardar tu progreso.
          </p>
        </div>

        <label className="mt-7 block text-sm font-bold text-slate-300">
          Correo electrónico
          <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/70 px-4 focus-within:border-blue-400">
            <Mail size={18} className="text-blue-300" />
            <input
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              {...register("email", { required: true })}
              className="w-full border-0 bg-transparent py-3 outline-none"
            />
          </span>
        </label>

        <label className="mt-4 block text-sm font-bold text-slate-300">
          Contraseña
          <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/70 px-4 focus-within:border-blue-400">
            <LockKeyhole size={18} className="text-blue-300" />
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Tu contraseña"
              {...register("password", { required: true })}
              className="w-full border-0 bg-transparent py-3 outline-none"
            />
          </span>
        </label>

        <button
          type="button"
          onClick={() => void handlePasswordReset()}
          disabled={loading}
          className="mt-3 block text-sm font-bold text-blue-300 hover:text-blue-200 disabled:opacity-50"
        >
          ¿Olvidaste tu contraseña?
        </button>

        <button
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 py-3.5 font-black shadow-lg shadow-blue-950/50 disabled:opacity-50"
        >
          {loading ? (
            "Procesando..."
          ) : (
            <>
              Iniciar sesión <ArrowRight size={18} />
            </>
          )}
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-slate-500">
          <span className="h-px flex-1 bg-slate-700" />
          o continúa con
          <span className="h-px flex-1 bg-slate-700" />
        </div>

        <button
          type="button"
          onClick={() => void handleGoogleLogin()}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-600 bg-white/5 py-3.5 font-bold text-white transition hover:border-blue-300 hover:bg-blue-500/10 disabled:opacity-50"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-black text-red-500">
            G
          </span>
          Continuar con Google
        </button>

        {message && (
          <p
            role="status"
            className={`mt-4 rounded-xl p-3 text-center text-sm ${
              success
                ? "bg-emerald-500/10 text-emerald-200"
                : "bg-rose-500/10 text-rose-200"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-slate-400">
          ¿No tienes cuenta?{" "}
          <Link
            href="/auth/register"
            className="font-bold text-blue-300 hover:text-blue-200"
          >
            Crear cuenta
          </Link>
        </p>
      </form>
    </main>
  );
}
