import { useEffect } from "react";
import { useDominoStore } from "@/stores/useDominoStore";
import { socket } from "@/services/socket";
import type { DominoGame } from "@/types/domino";

export function useDominoSocket() {
  const setGame = useDominoStore((s) => s.setGame);

  useEffect(() => {
    socket.connect();

    const onState = (game: DominoGame) => {
      setGame(game);
    };

    const onError = (error: string) => {
      console.error(error);
    };

    socket.on("domino:state", onState);
    socket.on("domino:error", onError);

    return () => {
      socket.off("domino:state", onState);
      socket.off("domino:error", onError);
    };
  }, [setGame]);

  return socket;
}
