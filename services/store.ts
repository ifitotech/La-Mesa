import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export type StoreItem = {
  id: string;
  name: string;
  description: string;
  type: "avatar" | "frame" | "badge";
  price: number;
  image: string;
};

export async function getStoreItems() {
  const snapshot = await getDocs(
    query(collection(db, "store"))
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<StoreItem, "id">),
  }));
}

export async function buyItem(
  uid: string,
  item: StoreItem
) {
  await updateDoc(doc(db, "users", uid), {
    coins: increment(-item.price),
    [`inventory.${item.id}`]: true,
  });
}