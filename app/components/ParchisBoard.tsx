"use client";

import { PARCHIS_GOAL, PARCHIS_TRACK_SIZE, ParchisState, boardCell } from "@/lib/parchis-engine";

type Props = {
  game: ParchisState;
  legalMoves: number[];
  onMove(pieceIndex: number): void;
};

const colors = ["#ef4444", "#22c55e", "#eab308", "#3b82f6"];
const homeCenters = [
  { x: 29, y: 27 },
  { x: 71, y: 27 },
  { x: 71, y: 72 },
  { x: 29, y: 72 },
];
const homeOffsets = [
  { x: -4, y: -4 }, { x: 4, y: -4 }, { x: -4, y: 4 }, { x: 4, y: 4 },
];

function trackPoint(cell: number) {
  const segment = PARCHIS_TRACK_SIZE / 4;
  const side = Math.floor(cell / segment);
  const progress = (cell % segment) / (segment - 1);
  if (side === 0) return { x: 28 + progress * 44, y: 18 };
  if (side === 1) return { x: 82, y: 18 + progress * 64 };
  if (side === 2) return { x: 72 - progress * 44, y: 82 };
  return { x: 18, y: 82 - progress * 64 };
}

function goalPoint(playerIndex: number, steps: number) {
  const center = { x: 50, y: 50 };
  const start = trackPoint((playerIndex * (PARCHIS_TRACK_SIZE / 4)) % PARCHIS_TRACK_SIZE);
  const progress = Math.min(1, Math.max(0, (steps - PARCHIS_TRACK_SIZE + 1) / (PARCHIS_GOAL - PARCHIS_TRACK_SIZE + 1)));
  return {
    x: start.x + (center.x - start.x) * progress,
    y: start.y + (center.y - start.y) * progress,
  };
}

export default function ParchisBoard({ game, legalMoves, onMove }: Props) {
  return (
    <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl">
      {game.players.flatMap((player, playerIndex) =>
        player.pieces.map((piece, pieceIndex) => {
          const cell = boardCell(player, piece);
          const point = piece.steps < 0
            ? {
                x: homeCenters[playerIndex].x + homeOffsets[pieceIndex].x,
                y: homeCenters[playerIndex].y + homeOffsets[pieceIndex].y,
              }
            : piece.steps >= PARCHIS_TRACK_SIZE
              ? goalPoint(playerIndex, piece.steps)
              : trackPoint(cell ?? 0);
          const movable = game.players[game.turn]?.id === player.id && legalMoves.includes(pieceIndex);
          return (
            <button
              key={piece.id}
              onClick={() => onMove(pieceIndex)}
              disabled={!movable}
              aria-label={`Mover ficha ${pieceIndex + 1} de ${player.name}`}
              title={`${player.name} · ${piece.steps < 0 ? "Casa" : piece.steps === PARCHIS_GOAL ? "Meta" : `Casilla ${piece.steps}`}`}
              className={`absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white/90 text-[10px] font-black text-white shadow-[0_5px_12px_rgba(0,0,0,.48)] transition-all duration-500 sm:h-10 sm:w-10 ${movable ? "animate-pulse ring-4 ring-amber-200/65 hover:scale-110" : ""}`}
              style={{ left: `${point.x}%`, top: `${point.y}%`, backgroundColor: colors[playerIndex] }}
            >
              {pieceIndex + 1}
            </button>
          );
        }),
      )}
    </div>
  );
}
