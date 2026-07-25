import { DominoGame } from "@/types/domino";
import { createGame } from "./createGame";
import { playTile } from "./playTile";
import { drawTile } from "./drawTile";
import { passTurn } from "./passTurn";
import { checkWinner } from "./checkWinner";
import { finishGame } from "./finishGame";

export class DominoEngine {
  private game: DominoGame;

  constructor(roomId: string, players: string[]) {
    this.game = createGame(roomId, players);
  }

  getGame(): DominoGame {
    return this.game;
  }

  play(playerId: string, tileId: string): boolean {
    const played = playTile(this.game, playerId, tileId);

    if (!played) {
      return false;
    }

    const winner = checkWinner(this.game);

    if (winner) {
      finishGame(this.game);
      return true;
    }

    passTurn(this.game);

    return true;
  }

  draw(playerId: string): boolean {
    const player = this.game.players.find(
      (p) => p.uid === playerId
    );

    if (!player) {
      return false;
    }

    return drawTile(player, this.game.stock);
  }

  pass(): void {
    passTurn(this.game);
  }
}