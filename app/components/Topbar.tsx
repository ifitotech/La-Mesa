"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/services/auth";

export default function Topbar() {
  const { user } = useAuth();

  const router = useRouter();

  async function handleLogout() {
    try {
      await logoutUser();
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          🎲 La Mesa
        </h1>

        <p className="text-sm text-slate-500">
          {user?.email}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    </header>
  );
}