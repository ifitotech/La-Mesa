"use client";

import { useEffect, useState } from "react";

import Avatar from "./Avatar";
import { Player } from "@/services/player";
import { searchUsers } from "@/services/users";

export default function UserSearch() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const results = await searchUsers(search);
        setUsers(results);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [search]);

  return (
    <div className="space-y-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar jugador..."
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500"
      />

      {loading && (
        <div className="text-center text-slate-400">
          Buscando...
        </div>
      )}

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.uid}
            className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-4"
          >
            <div className="flex items-center gap-4">
              <Avatar
                avatar={user.avatar}
                photoURL={user.photoURL}
                name={user.displayName}
                size="md"
              />

              <div>
                <div className="font-semibold">
                  {user.displayName}
                </div>

                <div className="text-sm text-slate-400">
                  {user.email}
                </div>
              </div>
            </div>

            <button
              className="rounded-xl bg-blue-600 px-4 py-2 font-semibold transition hover:bg-blue-700"
            >
              Agregar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}