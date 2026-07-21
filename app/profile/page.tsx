"use client";

import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold">
          Mi Perfil
        </h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-500">
              Correo electrónico
            </p>

            <p className="text-lg font-semibold">
              {user?.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              UID
            </p>

            <p className="break-all text-sm">
              {user?.uid}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Verificado
            </p>

            <p className="text-lg">
              {user?.emailVerified ? "Sí" : "No"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}