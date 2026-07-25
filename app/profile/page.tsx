"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import Avatar from "@/app/components/Avatar";
import AvatarPicker from "@/app/components/AvatarPicker";
import CountryPicker from "@/app/components/CountryPicker";
import PlayerCard from "@/app/components/PlayerCard";
import ProfileStats from "@/app/components/ProfileStats";

import { useAuthContext } from "@/contexts/AuthContext";
import {
  Player,
  subscribeToPlayer,
  updateAvatar,
  updateCountry,
} from "@/services/player";

export default function ProfilePage() {
  const { user, loading } = useAuthContext();

  const [player, setPlayer] = useState<Player | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState("avatar_001");
  const [selectedCountry, setSelectedCountry] = useState("CU");
  const [loadingPlayer, setLoadingPlayer] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToPlayer(user.uid, (data) => {
      if (data) {
        setPlayer(data);
        setSelectedAvatar(data.avatar || "avatar_001");
        setSelectedCountry(data.country || "CU");
      }

      setLoadingPlayer(false);
    });

    return () => unsubscribe();
  }, [user]);

  async function handleSave() {
    if (!user || !player) return;

    if (
      selectedAvatar === player.avatar &&
      selectedCountry === player.country
    ) return;

    try {
      setSaving(true);
      await Promise.all([
        updateAvatar(user.uid, selectedAvatar),
        updateCountry(user.uid, selectedCountry),
      ]);
    } finally {
      setSaving(false);
    }
  }

  if (loading || (user !== null && loadingPlayer)) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          Cargando...
        </div>
      </AppLayout>
    );
  }

  if (!player) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          Perfil no encontrado.
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <PlayerCard
          name={player.displayName}
          country={player.country}
          level={player.level}
          xp={player.xp}
          coins={player.coins}
          gems={player.gems}
          streak={player.streak}
          ranking={player.ranking}
        />

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="mesa-panel-gold rounded-3xl p-6">
            <h2 className="text-2xl font-bold">
              Avatar actual
            </h2>

            <div className="mt-8 flex justify-center">
              <Avatar
                avatar={selectedAvatar}
                name={player.displayName}
                size="xl"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={
                saving ||
                selectedAvatar === player.avatar &&
                selectedCountry === player.country
              }
              className="mt-8 w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 px-4 py-3 font-semibold transition hover:from-violet-500 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Guardando..." : "💾 Guardar cambios"}
            </button>
          </div>

          <div className="mesa-panel rounded-3xl p-6">
            <h2 className="mb-6 text-2xl font-bold">
              Elegir Avatar
            </h2>

            <AvatarPicker
              selected={selectedAvatar}
              onSelect={setSelectedAvatar}
            />

            <div className="mt-8 border-t border-slate-700/70 pt-6">
              <h3 className="text-lg font-black">Tu país y contenido</h3>
              <p className="mt-1 text-sm text-slate-400">
                Personaliza Trivia, temas y futuras experiencias de La Mesa.
              </p>
              <div className="mt-4">
                <CountryPicker
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                />
              </div>
            </div>
          </div>
        </div>

        <ProfileStats
          gamesPlayed={0}
          wins={0}
          losses={0}
          trophies={0}
        />
      </div>
    </AppLayout>
  );
}
