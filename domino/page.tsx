"use client";

import { useDominoGame, useDominoSocket } from "@/hooks";

import {
  GameStatus,
  PassButton,
  StockButton,
  WinnerModal,
} from "@/app/components/domino";

export default function DominoPage() {
  useDominoSocket();

  const { game } = useDominoGame();

  if (!game) {
    return (
      <main className="flex h-screen items-center justify-center">
        Esperando partida...
      </main>
    );
  }

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
      <GameStatus />

      <div className="flex gap-4">
        <StockButton />
        <PassButton />
      </div>

      <WinnerModal />
    </main>
  );
}