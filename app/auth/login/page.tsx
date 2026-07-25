"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginUser, loginWithGoogle } from "@/services/auth";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
  } = useForm<FormData>();

  const [message, setMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      await loginUser(data.email, data.password);

      setMessage("✅ Inicio de sesión exitoso.");

      router.push("/onboarding");
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "No se pudo iniciar sesión.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push("/onboarding");
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "No se pudo iniciar sesión con Google.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        <h1 className="mb-6 text-center text-3xl font-bold">
          Iniciar sesión
        </h1>

        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email", { required: true })}
          className="mb-4 w-full rounded-lg border p-3"
        />

        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}
          className="mb-4 w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Entrar
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-300" />o continúa con<span className="h-px flex-1 bg-slate-300" /></div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white py-3 font-semibold text-slate-800 hover:bg-slate-50"
        >
          <span className="text-lg font-black text-red-500">G</span>
          Continuar con Google
        </button>

        {message && (
          <p className="mt-4 text-center text-sm">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
