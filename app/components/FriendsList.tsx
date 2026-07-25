"use client";

import { useCallback, useEffect, useState } from "react";

import Avatar from "./Avatar";
import { useAuthContext } from "@/contexts/AuthContext";
import { getFriends } from "@/services/friendsList";
import { Player } from "@/services/player";

export default function FriendsList() {
  const { user } = useAuthContext();
  const [friends, setFriends] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFriends = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      setFriends(await getFriends(user.uid));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void Promise.resolve().then(loadFriends);
  }, [loadFriends]);

  return (
    <div>
      <h2 className="text-2xl font-black">Tus amigos</h2>
      {loading ? (
        <p className="mt-4 text-slate-400">Cargando amigos...</p>
      ) : friends.length === 0 ? (
        <p className="mt-4 text-sm text-slate-400">
          Todavía no has agregado amigos.
        </p>
      ) : (
        <div className="mt-5 space-y-3">
          {friends.map((friend) => (
            <div
              key={friend.uid}
              className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4"
            >
              <Avatar
                avatar={friend.avatar}
                photoURL={friend.photoURL}
                name={friend.displayName}
                size="md"
              />
              <div>
                <p className="font-bold">{friend.displayName}</p>
                <p className="text-sm text-slate-400">
                  Nivel {friend.level} · {friend.xp} XP
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
