import {
  collection,
  getDocs,
  query,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  reward: number;
};

export async function getAchievements() {
  const snapshot = await getDocs(
    query(collection(db, "achievements"))
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<
      Achievement,
      "id"
    >),
  }));
}