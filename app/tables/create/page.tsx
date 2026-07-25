"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useAuth } from "@/hooks/useAuth";
import { createTable } from "@/services/tables";
import { dominoService } from "@/services/domino";

type FormData = {
  name: string;
  game: string;
};

export default function CreateTablePage() {
  const router = useRouter();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      game: "Dominó",
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(data: FormData) {
    if (!user) {
      setMessage("Debes iniciar sesión.");
      return;
    }

    try {
      setLoading(true);

      const tableId = await createTable({
        name: data.name,
        game: data.game,
        ownerId: user.uid,
        ownerEmail: user.email ?? "",
      });

      // Crear la partida de dominó en el servidor Socket.IO
      dominoService.createRoom(tableId, [user.uid]);

      setMessage("✅ Mesa creada correctamente.");

      reset();

      setTimeout(() => {
        router.push(`/tables/${tableId}`);
      }, 1000);
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "No se pudo crear la mesa.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl"
      >
        <h1 className="mb-6 text-3xl font-bold">
          Crear Mesa
        </h1>

        <label className="mb-2 block font-medium">
          Nombre de la mesa
        </label>

        <input
          {...register("name", { required: true })}
          placeholder="Ej: Dominó de los viernes"
          className="mb-6 w-full rounded-lg border p-3"
        />

        <label className="mb-2 block font-medium">
          Juego
        </label>

        <select
          {...register("game")}
          className="mb-6 w-full rounded-lg border p-3"
        >
          <option>Dominó</option>
          <option>Parchís</option>
          <option>UNO</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Creando..." : "Crear Mesa"}
        </button>

        {message && (
          <p className="mt-5 text-center">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
