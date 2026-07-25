"use client";

import Image from "next/image";
import clsx from "clsx";

type AvatarSize = "sm" | "md" | "lg" | "xl";

type Props = {
  avatar?: string;
  photoURL?: string;
  name: string;
  size?: AvatarSize;
  online?: boolean;
  className?: string;
};

const sizes = {
  sm: 40,
  md: 64,
  lg: 96,
  xl: 140,
};

export default function Avatar({
  avatar = "avatar_001",
  photoURL,
  name,
  size = "md",
  online = false,
  className,
}: Props) {
  const dimension = sizes[size];

  const imageSrc = photoURL?.trim()
    ? photoURL
    : `/avatars/${avatar}.png?v=2`;

  return (
    <div className={clsx("relative inline-flex", className)}>
      <Image
        src={imageSrc}
        alt={name}
        width={dimension}
        height={dimension}
        className="rounded-full border-2 border-slate-700 bg-slate-900 object-cover"
        priority
        unoptimized
      />

      {online && (
        <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-slate-900 bg-green-500" />
      )}
    </div>
  );
}