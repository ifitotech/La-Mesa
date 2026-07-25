"use client";

import clsx from "clsx";

import Avatar from "./Avatar";

type Props = {
  selected: string;
  ownedAvatars: string[];
  onSelect: (avatar: string) => void;
};

export default function AvatarPicker({
  selected,
  ownedAvatars,
  onSelect,
}: Props) {
  const avatars = Array.from(
    new Set(["avatar_001", selected, ...ownedAvatars]),
  ).sort();

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
      {avatars.map((avatar) => (
        <button
          key={avatar}
          type="button"
          onClick={() => onSelect(avatar)}
          aria-pressed={selected === avatar}
          aria-label={`Usar ${avatar.replace("_", " ")}`}
          className={clsx(
            "rounded-2xl border-2 p-2 transition-all duration-200",
            selected === avatar
              ? "scale-105 border-blue-500 bg-blue-500/10"
              : "border-slate-700 hover:scale-105 hover:border-slate-500",
          )}
        >
          <Avatar avatar={avatar} name={avatar} size="lg" />
        </button>
      ))}
    </div>
  );
}
