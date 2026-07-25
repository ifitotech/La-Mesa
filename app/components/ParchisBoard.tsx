"use client";

import { PARCHIS_GOAL, PARCHIS_SAFE_CELLS, PARCHIS_TRACK_SIZE, ParchisState, boardCell } from "@/lib/parchis-engine";

type Props = { game: ParchisState; legalMoves: number[]; onMove(pieceIndex: number): void };
type Point = { x: number; y: number };

const playerColors = ["#2589e8", "#e9b817", "#20bd61", "#e5483e"];
const safeCells = new Set([...PARCHIS_SAFE_CELLS].map((cell) => cell + 1));
const route = new Map<number, Point>();

for (let offset = 0; offset < 8; offset += 1) route.set(48 + offset, { x: 8, y: offset });
for (let offset = 0; offset < 8; offset += 1) route.set(46 - offset, { x: 10, y: offset });
route.set(47, { x: 9, y: 0 });
for (let offset = 0; offset < 8; offset += 1) route.set(38 - offset, { x: 11 + offset, y: 8 });
for (let offset = 0; offset < 8; offset += 1) route.set(22 + offset, { x: 11 + offset, y: 10 });
route.set(30, { x: 18, y: 9 });
for (let offset = 0; offset < 8; offset += 1) route.set(21 - offset, { x: 10, y: 11 + offset });
for (let offset = 0; offset < 8; offset += 1) route.set(5 + offset, { x: 8, y: 11 + offset });
route.set(13, { x: 9, y: 18 });
[4, 3, 2, 1, 68, 67, 66, 65].forEach((cell, offset) => route.set(cell, { x: 7 - offset, y: 10 }));
for (let offset = 0; offset < 8; offset += 1) route.set(56 + offset, { x: 7 - offset, y: 8 });
route.set(64, { x: 0, y: 9 });

const homeCenters = [
  [{ x: 3, y: 3 }, { x: 5, y: 3 }, { x: 3, y: 5 }, { x: 5, y: 5 }],
  [{ x: 13, y: 3 }, { x: 15, y: 3 }, { x: 13, y: 5 }, { x: 15, y: 5 }],
  [{ x: 13, y: 13 }, { x: 15, y: 13 }, { x: 13, y: 15 }, { x: 15, y: 15 }],
  [{ x: 3, y: 13 }, { x: 5, y: 13 }, { x: 3, y: 15 }, { x: 5, y: 15 }],
];

function finishPoint(playerIndex: number, steps: number): Point {
  const progress = Math.min(7, Math.max(1, steps - PARCHIS_TRACK_SIZE));
  if (playerIndex === 0) return { x: 9, y: progress };
  if (playerIndex === 1) return { x: 18 - progress, y: 9 };
  if (playerIndex === 2) return { x: 9, y: 18 - progress };
  return { x: progress, y: 9 };
}

function cellStyle(point: Point) {
  return { gridColumn: point.x + 1, gridRow: point.y + 1 };
}

export default function ParchisBoard({ game, legalMoves, onMove }: Props) {
  return (
    <div className="game-3d-board mx-auto aspect-square w-full max-w-[44rem] rounded-[1.6rem] border-[8px] border-[#6c4422] bg-[#eadfbf] p-1 shadow-[inset_0_0_0_2px_#d5a84d,0_8px_0_#3d2513,0_28px_55px_rgba(0,0,0,.55)]">
      <div className="relative grid h-full w-full grid-cols-[repeat(19,minmax(0,1fr))] grid-rows-[repeat(19,minmax(0,1fr))] overflow-hidden rounded-xl">
        <div className="col-span-8 row-span-8 bg-blue-500 p-[14%]"><div className="h-full rounded-3xl bg-blue-700/35 shadow-inner" /></div>
        <div className="col-start-12 col-span-8 row-span-8 bg-amber-400 p-[14%]"><div className="h-full rounded-3xl bg-amber-600/35 shadow-inner" /></div>
        <div className="col-start-12 col-span-8 row-start-12 row-span-8 bg-emerald-500 p-[14%]"><div className="h-full rounded-3xl bg-emerald-700/35 shadow-inner" /></div>
        <div className="col-span-8 row-start-12 row-span-8 bg-rose-500 p-[14%]"><div className="h-full rounded-3xl bg-rose-700/35 shadow-inner" /></div>

        {[...route.entries()].map(([number, point]) => (
          <span key={number} style={cellStyle(point)} className={`z-[1] flex items-center justify-center border border-stone-500/55 bg-[#fffdf4] text-[6px] font-bold text-stone-500 sm:text-[9px] ${safeCells.has(number) ? "bg-stone-300 text-amber-700" : ""}`}>
            {safeCells.has(number) ? "★" : number}
          </span>
        ))}

        {Array.from({ length: 7 }, (_, index) => index + 1).flatMap((step) => [
          <span key={`b-${step}`} style={cellStyle({ x: 9, y: step })} className="border border-blue-700/35 bg-blue-500" />,
          <span key={`y-${step}`} style={cellStyle({ x: 18 - step, y: 9 })} className="border border-amber-600/35 bg-amber-400" />,
          <span key={`g-${step}`} style={cellStyle({ x: 9, y: 18 - step })} className="border border-emerald-700/35 bg-emerald-500" />,
          <span key={`r-${step}`} style={cellStyle({ x: step, y: 9 })} className="border border-rose-700/35 bg-rose-500" />,
        ])}

        <div className="col-start-9 col-span-3 row-start-9 row-span-3 z-[2] bg-[conic-gradient(#eab308_0_25%,#22c55e_0_50%,#ef4444_0_75%,#3b82f6_0)] shadow-inner" />

        {game.players.flatMap((player, playerIndex) =>
          player.pieces.map((piece, pieceIndex) => {
            const cell = boardCell(player, piece);
            const point = piece.steps < 0
              ? homeCenters[playerIndex][pieceIndex]
              : piece.steps >= PARCHIS_TRACK_SIZE
                ? finishPoint(playerIndex, piece.steps)
                : route.get((cell ?? 0) + 1) ?? homeCenters[playerIndex][pieceIndex];
            const movable = game.players[game.turn]?.id === player.id && legalMoves.includes(pieceIndex);
            return (
              <button
                key={piece.id}
                onClick={() => onMove(pieceIndex)}
                disabled={!movable}
                aria-label={`Mover ficha ${pieceIndex + 1} de ${player.name}`}
                style={{ ...cellStyle(point), backgroundColor: playerColors[playerIndex] }}
                className={`game-3d-token z-10 m-auto flex h-[74%] w-[74%] items-center justify-center rounded-full border-2 border-white/90 text-[8px] font-black text-white transition-all duration-500 sm:text-xs ${movable ? "animate-pulse ring-2 ring-amber-200 hover:scale-125" : ""}`}
              >
                {piece.steps === PARCHIS_GOAL ? "★" : "♛"}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}
