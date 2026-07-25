import { DominoEngine } from "./domino/DominoEngine";
import { TriviaEngine } from "./engines/TriviaEngine";

export type GameType =
  | "domino"
  | "trivia";

export class RoomManager {
  private rooms = new Map<
    string,
    DominoEngine | TriviaEngine
  >();

  get(
    roomId: string,
    game: GameType
  ) {
    if (!this.rooms.has(roomId)) {
      if (game === "domino") {
        this.rooms.set(
          roomId,
          new DominoEngine(roomId, [])
        );
      } else {
        this.rooms.set(
          roomId,
          new TriviaEngine()
        );
      }
    }

    return this.rooms.get(roomId)!;
  }

  remove(roomId: string) {
    this.rooms.delete(roomId);
  }
}