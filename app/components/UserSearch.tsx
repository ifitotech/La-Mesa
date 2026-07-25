"use client";

import { useEffect, useState } from "react";

import Avatar from "./Avatar";
import { useAuthContext } from "@/contexts/AuthContext";
import { sendFriendRequest } from "@/services/friends";
import { Player } from "@/services/player";
import { searchUsers } from "@/services/users";

export default function UserSearch() {
  const { user: currentUser } = useAuthContext();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendingTo, setSendingTo] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const cleanSearch = search.trim();
    if (cleanSearch.length < 2) return;

    let active = true;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchUsers(cleanSearch);
        if (active) {
          setUsers(results.filter((player) => player.uid !== currentUser?.uid));
        }
      } catch {
        if (active) setMessage("No pudimos buscar jugadores.");
      } finally {
        if (active) setLoading(false);
      }
    }, 300);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [currentUser?.uid, search]);

  async function addFriend(player: Player) {
    if (!currentUser) {
      setMessage("Inicia sesión para agregar amigos.");
      return;
    }

    try {
      setSendingTo(player.uid);
      setMessage("");
      await sendFriendRequest(currentUser.uid, player.uid);
      setSentTo((current) => [...new Set([...current, player.uid])]);
    } catch (cause) {
      setMessage(
        cause instanceof Error
          ? cause.message
          : "No pudimos enviar la solicitud.",
      );
    } finally {
      setSendingTo(null);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-black">Buscar jugadores</h2>
        <p className="mt-1 text-sm text-slate-400">
          Escribe al menos dos letras del nombre o correo.
        </p>
      </div>

      <input
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setMessage("");
          if (event.target.value.trim().length < 2) setUsers([]);
        }}
        placeholder="Buscar jugador..."
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500"
      />

      {loading && <div className="text-center text-slate-400">Buscando...</div>}
      {message && <p role="status" className="text-sm text-rose-300">{message}</p>}

      {!loading && search.trim().length >= 2 && users.length === 0 && (
        <p className="text-sm text-slate-400">No encontramos jugadores.</p>
      )}

      <div className="space-y-3">
        {users.map((player) => {
          const sent = sentTo.includes(player.uid);
          return (
            <div
              key={player.uid}
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4"
            >
              <div className="flex min-w-0 items-center gap-4">
                <Avatar
                  avatar={player.avatar}
                  photoURL={player.photoURL}
                  name={player.displayName}
                  size="md"
                />
                <div className="min-w-0">
                  <div className="truncate font-semibold">{player.displayName}</div>
                  <div className="truncate text-sm text-slate-400">{player.email}</div>
                </div>
              </div>
              <button
                onClick={() => void addFriend(player)}
                disabled={sent || sendingTo === player.uid}
                className="shrink-0 rounded-xl bg-blue-600 px-4 py-2 font-semibold transition hover:bg-blue-700 disabled:opacity-50"
              >
                {sent
                  ? "Enviada"
                  : sendingTo === player.uid
                    ? "Enviando..."
                    : "Agregar"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
