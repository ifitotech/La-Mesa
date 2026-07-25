import { useDominoStore } from "@/stores/useDominoStore";
import { dominoService } from "@/services/domino";

export function useDominoGame() {
  const game = useDominoStore(
    (s) => s.game
  );

  return {
    game,

    createRoom:
      dominoService.createRoom,

    joinRoom:
      dominoService.joinRoom,

    play:
      dominoService.play,

    draw:
      dominoService.draw,

    pass:
      dominoService.pass,

    leave:
      dominoService.leave,
  };
}