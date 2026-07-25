import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/config";

import { DominoEngine } from "@/server/domino/DominoEngine";

export type GameType = "domino" | "trivia";

export type DominoGameDocument = {
  roomId: string;
  type: "domino";
  state: ReturnType<DominoEngine["getGame"]>;
  createdAt?: unknown;
};

const COLLECTION = "games";

export async function createDominoGame(
  roomId: string,
  players: string[]
): Promise<string> {
  const engine = new DominoEngine(roomId, players);

  const game: DominoGameDocument = {
    roomId,
    type: "domino",
    state: engine.getGame(),
    createdAt: serverTimestamp(),
  };

  const ref = await addDoc(
    collection(db, COLLECTION),
    game
  );

  return ref.id;
}

export async function getGame(gameId: string) {
  const snap = await getDoc(
    doc(db, COLLECTION, gameId)
  );

  if (!snap.exists()) {
    return null;
  }

  return {
    id: snap.id,
    ...snap.data(),
  };
}