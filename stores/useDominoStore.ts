import { create } from "zustand";
import { DominoGame } from "@/types/domino";

type Store = {
  game: DominoGame | null;

  setGame: (
    game: DominoGame
  ) => void;

  reset: () => void;
};

export const useDominoStore =
  create<Store>((set) => ({
    game: null,

    setGame: (game) =>
      set({ game }),

    reset: () =>
      set({
        game: null,
      }),
  }));