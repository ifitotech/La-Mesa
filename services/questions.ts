import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export type Question = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  category: string;
  difficulty: "easy" | "medium" | "hard";
};

export async function getQuestions(
  amount = 10,
  category = "general"
): Promise<Question[]> {
  const snapshot = await getDocs(
    query(
      collection(db, "questions"),
      where("category", "==", category),
      limit(amount)
    )
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Question, "id">),
  }));
}