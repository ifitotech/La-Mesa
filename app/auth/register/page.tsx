"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { registerUser } from "@/services/auth";

type FormData = {
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>();

  const [message, setMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data.email, data.password);

      setMessage("✅ Usuario creado correctamente.");

      reset();

      router.push("/dashboard");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        <h1 className="mb-6 text-center text-3xl font-bold">
          Crear cuenta
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
          {...register("password", {
            required: true,
            minLength: 6,
          })}
          className="mb-4 w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
        >
          Crear cuenta
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