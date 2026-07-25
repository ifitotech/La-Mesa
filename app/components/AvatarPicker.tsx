"use client";

import { useState } from "react";
import clsx from "clsx";
import { Area, Point } from "react-easy-crop";

import Avatar from "./Avatar";
import AvatarCropper from "./AvatarCropper";

type Props = {
  selected: string;
  onSelect: (avatar: string) => void;
};

const avatars = Array.from({ length: 20 }, (_, index) => ({
  id: `avatar_${String(index + 1).padStart(3, "0")}`,
}));

export default function AvatarPicker({
  selected,
  onSelect,
}: Props) {
  const [editingAvatar, setEditingAvatar] = useState<string | null>(null);

  const [cropData, setCropData] = useState<{
    crop: Point;
    zoom: number;
    pixels: Area;
  } | null>(null);

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        {avatars.map((avatar) => (
          <button
            key={avatar.id}
            type="button"
            onClick={() => setEditingAvatar(avatar.id)}
            className={clsx(
              "rounded-2xl border-2 p-2 transition-all duration-200",
              selected === avatar.id
                ? "border-blue-500 bg-blue-500/10 scale-105"
                : "border-slate-700 hover:border-slate-500 hover:scale-105"
            )}
          >
            <Avatar
              avatar={avatar.id}
              name={avatar.id}
              size="lg"
            />
          </button>
        ))}
      </div>

      {editingAvatar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 p-6 shadow-2xl">

            <h2 className="mb-6 text-2xl font-bold">
              Ajustar Avatar
            </h2>

            <AvatarCropper
              image={`/avatars/${editingAvatar}.png`}
              onApply={(pixels, crop, zoom) => {
                setCropData({
                  pixels,
                  crop,
                  zoom,
                });
              }}
            />

            <div className="mt-6 flex justify-between items-center">

              <div className="text-sm text-slate-400">
                {cropData ? "✔ Recorte listo" : "Mueve o haz zoom en la imagen"}
              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => {
                    setEditingAvatar(null);
                    setCropData(null);
                  }}
                  className="rounded-xl border border-slate-700 px-5 py-3 hover:bg-slate-800"
                >
                  Cancelar
                </button>

                <button
                  onClick={() => {
                    if (!cropData) return;

                    console.log(cropData);

                    onSelect(editingAvatar);

                    setEditingAvatar(null);
                  }}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
                >
                  Aplicar
                </button>

              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}