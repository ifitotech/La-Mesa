import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export type RankingPlayer = {
  uid: string;
  displayName: string;
  xp: number;
};

export async function getRanking(): Promise<RankingPlayer[]> {
  const snapshot = await getDocs(
    query(
      collection(db, "users"),
      orderBy("xp", "desc"),
      limit(100)
    )
  );

  return snapshot.docs.map((doc) => ({
    uid: doc.id,
    displayName: String(doc.data().displayName ?? "Jugador"),
    xp: Number(doc.data().xp ?? 0),
  }));
}
