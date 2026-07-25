import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  getDoc,
  runTransaction,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { createDominoGame } from "@/services/game";
import {
  getGameDefinition,
  isGameAvailableOnline,
  type GameId,
} from "@/lib/game-catalog";

export type RoomStatus =
  | "waiting"
  | "playing"
  | "finished";

export type Room = {
  id?: string;
  code: string;
  host: string;
  players: string[];
  maxPlayers: number;
  game: GameId;
  status: RoomStatus;
  gameId?: string;
  scores?: Record<string, number>;
  createdAt?: unknown;
};

const COLLECTION = "rooms";

function generateCode(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "";

  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return code;
}

async function createUniqueCode(): Promise<string> {
  while (true) {
    const code = generateCode();

    const snapshot = await getDocs(
      query(
        collection(db, COLLECTION),
        where("code", "==", code)
      )
    );

    if (snapshot.empty) {
      return code;
    }
  }
}

export async function createRoom(
  hostUid: string,
  game: GameId = "trivia"
): Promise<string> {
  if (!isGameAvailableOnline(game)) {
    throw new Error("Este juego todavía no está disponible en partidas online.");
  }

  const code = await createUniqueCode();
  const definition = getGameDefinition(game);

  const room: Room = {
    code,
    host: hostUid,
    players: [hostUid],
    maxPlayers: definition.maxPlayers,
    game,
    status: "waiting",
    createdAt: serverTimestamp(),
  };

  const ref = await addDoc(
    collection(db, COLLECTION),
    room
  );

  return ref.id;
}

export async function getRoomByCode(code: string) {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTION),
      where("code", "==", code.toUpperCase())
    )
  );

  if (snapshot.empty) {
    return null;
  }

  return {
    id: snapshot.docs[0].id,
    ...(snapshot.docs[0].data() as Room),
  };
}

export async function joinRoomByCode(
  code: string,
  uid: string
) {
  const room = await getRoomByCode(code);

  if (!room) {
    throw new Error("Sala no encontrada.");
  }

  if (room.players.includes(uid)) {
    return room.id!;
  }

  if (room.players.length >= room.maxPlayers) {
    throw new Error("La sala está llena.");
  }

  await updateDoc(
    doc(db, COLLECTION, room.id!),
    {
      players: arrayUnion(uid),
    }
  );

  return room.id!;
}

export async function leaveRoom(
  roomId: string,
  uid: string
) {
  const ref = doc(db, COLLECTION, roomId);

  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const room = snap.data() as Room;

  const players = room.players.filter(
    (player) => player !== uid
  );

  if (players.length === 0) {
    await deleteDoc(ref);
    return;
  }

  await updateDoc(ref, {
    players,
    host:
      room.host === uid
        ? players[0]
        : room.host,
  });
}

export async function startRoom(
  roomId: string,
  uid: string,
) {
  const snap = await getDoc(
    doc(db, COLLECTION, roomId)
  );

  if (!snap.exists()) {
    throw new Error("Sala no encontrada.");
  }

  const room = snap.data() as Room;

  if (room.host !== uid) {
    throw new Error("Solo el anfitrión puede iniciar la partida.");
  }

  if (room.players.length < getGameDefinition(room.game).minPlayers) {
    throw new Error("No hay suficientes jugadores para iniciar este juego.");
  }

  if (room.game === "domino") {
    const gameId = await createDominoGame(roomId, room.players);

    await updateDoc(doc(db, COLLECTION, roomId), {
      status: "playing",
      gameId,
    });
    return;
  }

  await updateDoc(doc(db, COLLECTION, roomId), {
    status: "playing",
    currentQuestion: 0,
    answers: {},
    scores: {},
  });
}

export async function submitTriviaScore(
  roomId: string,
  uid: string,
  score: number
) {
  const roomRef = doc(db, COLLECTION, roomId);

  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(roomRef);

    if (!snapshot.exists()) {
      throw new Error("Sala no encontrada.");
    }

    const room = snapshot.data() as Room;

    if (!room.players.includes(uid)) {
      throw new Error("No perteneces a esta sala.");
    }

    const scores = {
      ...(room.scores ?? {}),
      [uid]: Math.max(0, Math.round(score)),
    };
    const finished = room.players.every((playerId) => scores[playerId] !== undefined);

    transaction.update(roomRef, {
      scores,
      ...(finished
        ? { status: "finished", finishedAt: serverTimestamp() }
        : {}),
    });
  });
}
