export type DominoTile = {
  id: string;
  left: number;
  right: number;
};

export type DominoPlayer = {
  uid: string;
  hand: DominoTile[];
  points: number;
};

export type DominoGameStatus =
  | "waiting"
  | "playing"
  | "finished";

export type DominoGame = {
  roomId: string;

  players: DominoPlayer[];

  board: DominoTile[];

  stock: DominoTile[];

  currentTurn: string;

  winner?: string;

  round: number;

  status: DominoGameStatus;
};