"use client";

import { useCallback, useEffect, useState } from "react";

import Avatar from "@/app/components/Avatar";

import { useAuthContext } from "@/contexts/AuthContext";
import {
  acceptFriendRequest,
  declineFriendRequest,
  FriendRequest,
  getPendingRequests,
} from "@/services/friends";
import { getPlayer, Player } from "@/services/player";

type RequestWithPlayer = FriendRequest & {
  player: Player;
};

export default function FriendRequests() {
  const { user } = useAuthContext();

  const [requests, setRequests] = useState<RequestWithPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = useCallback(async () => {
    if (!user) return;

    setLoading(true);

    try {
      const pending = await getPendingRequests(user.uid);

      const data = await Promise.all(
        pending.map(async (request) => {
          const player = await getPlayer(request.from);

          return player
            ? {
                ...request,
                player,
              }
            : null;
        })
      );

      setRequests(
        data.filter(
          (
            item
          ): item is RequestWithPlayer => item !== null
        )
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void Promise.resolve().then(loadRequests);
  }, [loadRequests]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        Cargando solicitudes...
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Solicitudes de amistad
      </h2>

      {requests.length === 0 && (
        <p className="text-slate-400">
          No tienes solicitudes pendientes.
        </p>
      )}

      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between rounded-2xl border border-slate-800 p-4"
          >
            <div className="flex items-center gap-4">
              <Avatar
                avatar={request.player.avatar}
                photoURL={request.player.photoURL}
                name={request.player.displayName}
                size="md"
              />

              <div>
                <div className="font-semibold">
                  {request.player.displayName}
                </div>

                <div className="text-sm text-slate-400">
                  {request.player.email}
                </div>
              </div>
            </div>

            <div className="flex gap-2">

              <button
                className="rounded-xl bg-green-600 px-4 py-2 font-semibold hover:bg-green-700"
                onClick={async () => {
                  await acceptFriendRequest(request);
                  await loadRequests();
                }}
              >
                Aceptar
              </button>

              <button
                className="rounded-xl bg-red-600 px-4 py-2 font-semibold hover:bg-red-700"
                onClick={async () => {
                  if (!request.id) return;

                  await declineFriendRequest(request.id);
                  await loadRequests();
                }}
              >
                Rechazar
              </button>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
