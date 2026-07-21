import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export type CreateTableData = {
  name: string;
  game: string;
  ownerId: string;
  ownerEmail: string;
};

export async function createTable(data: CreateTableData) {
  const docRef = await addDoc(collection(db, "tables"), {
    name: data.name,
    game: data.game,
    ownerId: data.ownerId,
    ownerEmail: data.ownerEmail,
    players: [
      {
        uid: data.ownerId,
        email: data.ownerEmail,
      },
    ],
    status: "waiting",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}