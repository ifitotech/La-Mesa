import {
  collection,
  getDocs,
  query,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export async function getDailyMissions() {
  const snapshot = await getDocs(
    query(collection(db, "dailyMissions"))
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}