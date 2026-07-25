export interface DominoPlayPayload {
  roomId: string;
  uid: string;
  tileId: string;
  side: "left" | "right";
}

export interface DominoDrawPayload {
  roomId: string;
  uid: string;
}

export interface DominoRoomPayload {
  roomId: string;
  players: string[];
}

export interface DominoJoinPayload {
  roomId: string;
}

export interface DominoPassPayload {
  roomId: string;
}