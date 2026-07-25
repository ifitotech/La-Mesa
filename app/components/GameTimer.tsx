"use client";

import DominoPip from "./DominoPip";

type Props = {
  left: number;
  right: number;
  horizontal?: boolean;
  selected?: boolean;
  onClick?(): void;
};

export default function DominoTile({
  left,
  right,
  horizontal = false,
  selected,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
      overflow-hidden
      rounded-lg
      bg-white
      shadow-lg
      transition
      ${
        horizontal
          ? "flex h-16 w-32"
          : "flex h-32 w-16 flex-col"
      }
      ${
        selected
          ? "ring-4 ring-blue-500"
          : ""
      }
      `}
    >
      <div className="flex-1 border-black">
        <DominoPip value={left} />
      </div>

      <div
        className={
          horizontal
            ? "w-px bg-black"
            : "h-px bg-black"
        }
      />

      <div className="flex-1">
        <DominoPip value={right} />
      </div>
    </button>
  );
}