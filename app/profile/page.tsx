"use client";

import { updateProfile } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import Avatar from "@/app/components/Avatar";
import AvatarPicker from "@/app/components/AvatarPicker";
import CountryPicker from "@/app/components/CountryPicker";
import FriendsList from "@/app/components/FriendsList";
import PlayerCard from "@/app/components/PlayerCard";
import ProfileStats from "@/app/components/ProfileStats";
import UserSearch from "@/app/components/UserSearch";

import { useAuthContext } from "@/contexts/AuthContext";
import {
  Player,
  subscribeToPlayer,
  updatePlayerProfile,
} from "@/services/player";
import FriendRequests from "@/services/FriendRequests";

export default function ProfilePage() {
  const { user, loading } = useAuthContext();

  const [player, setPlayer] = useState<Player | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState("avatar_001");
  const [selectedCountry, setSelectedCountry] = useState("CU");
  const [displayName, setDisplayName] = useState("");
  const [loadingPlayer, setLoadingPlayer] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToPlayer(user.uid, (data) => {
      if (data) {
        setPlayer(data);
        setSelectedAvatar(data.avatar || "avatar_001");
        setSelectedCountry(data.country || "CU");
        setDisplayName(data.displayName || user.displayName || "Jugador");
      }

      setLoadingPlayer(false);
    });

    return () => unsubscribe();
  }, [user]);

  async function handleSave() {
    if (!user || !player) return;
    const cleanName = displayName.trim().slice(0, 24);

    if (!cleanName) {
      setFeedback("Escribe un nombre para tu perfil.");
      return;
    }

    if (selectedAvatar === player.avatar && selectedCountry === player.country && cleanName === player.displayName) return;

    try {
      setSaving(true);
      setFeedback(null);
      await updatePlayerProfile(user.uid, { displayName: cleanName, avatar: selectedAvatar, country: selectedCountry });
      if (cleanName !== user.displayName) await updateProfile(user, { displayName: cleanName });
      setFeedback("Perfil actualizado correctamente.");
    } catch (error) {
      console.error(error);
      setFeedback("No pudimos guardar los cambios. Revisa tu conexión e inténtalo otra vez.");
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

  if (!user) {
    return (
      <AppLayout>
        <section className="mesa-panel-gold mx-auto max-w-xl rounded-3xl p-8 text-center">
          <h1 className="text-3xl font-black">Tu perfil te espera</h1>
          <p className="mt-3 text-slate-300">
            Inicia sesión para ver tus estadísticas, amigos, premios y avatares.
          </p>
          <Link
            href="/auth/login?next=/profile"
            className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 px-6 py-3 font-black"
          >
            Iniciar sesión
          </Link>
        </section>
      </AppLayout>
    );
  }

  if (!player) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          No pudimos cargar tu perfil. Inténtalo de nuevo en unos segundos.
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
          avatar={player.avatar}
          photoURL={player.photoURL}
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

            <label className="mt-7 block text-sm font-bold text-slate-200">
              Nombre visible
              <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={24} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/65 px-4 py-3 font-semibold text-white outline-none transition focus:border-violet-400" />
            </label>

            <button
              onClick={handleSave}
              disabled={saving || (selectedAvatar === player.avatar && selectedCountry === player.country && displayName.trim() === player.displayName)}
              className="mt-8 w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 px-4 py-3 font-semibold transition hover:from-violet-500 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Guardando..." : "💾 Guardar cambios"}
            </button>
            {feedback && <p className="mt-3 text-center text-sm text-slate-300">{feedback}</p>}
          </div>

          <div className="mesa-panel rounded-3xl p-6">
            <h2 className="mb-6 text-2xl font-bold">
              Elegir Avatar
            </h2>

            <AvatarPicker
              selected={selectedAvatar}
              ownedAvatars={Object.entries(player.inventory ?? {})
                .filter(([, owned]) => owned)
                .map(([avatar]) => avatar)}
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
          gamesPlayed={player.gamesPlayed ?? 0}
          wins={player.wins ?? 0}
          losses={player.losses ?? 0}
          trophies={player.trophies ?? 0}
        />

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="mesa-panel rounded-3xl p-6">
            <UserSearch />
          </div>
          <div className="space-y-6">
            <div className="mesa-panel rounded-3xl p-6">
              <FriendsList />
            </div>
            <FriendRequests />
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
