import {
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
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

export const defaultStoreItems: StoreItem[] = [
  {
    id: "avatar_002",
    name: "Noche tropical",
    description: "Un avatar vibrante para animar cualquier Game Night.",
    type: "avatar",
    price: 150,
    image: "/avatars/avatar_002.png",
  },
  {
    id: "avatar_004",
    name: "Estratega",
    description: "Para quienes siempre tienen preparada la próxima jugada.",
    type: "avatar",
    price: 200,
    image: "/avatars/avatar_004.png",
  },
  {
    id: "avatar_007",
    name: "Rey de la mesa",
    description: "Una presencia digna del primer lugar del ranking.",
    type: "avatar",
    price: 300,
    image: "/avatars/avatar_007.png",
  },
  {
    id: "avatar_010",
    name: "Ritmo latino",
    description: "Energía, música y buena vibra para tu perfil.",
    type: "avatar",
    price: 250,
    image: "/avatars/avatar_010.png",
  },
  {
    id: "avatar_014",
    name: "Mente maestra",
    description: "El compañero perfecto para dominar la trivia.",
    type: "avatar",
    price: 350,
    image: "/avatars/avatar_014.png",
  },
  {
    id: "avatar_018",
    name: "Leyenda",
    description: "Un avatar especial para jugadores que dejan huella.",
    type: "avatar",
    price: 500,
    image: "/avatars/avatar_018.png",
  },
];

export async function getStoreItems() {
  const snapshot = await getDocs(
    query(collection(db, "store"))
  );

  const items = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<StoreItem, "id">),
  }));

  return items.length > 0 ? items : defaultStoreItems;
}

export async function buyItem(
  uid: string,
  item: StoreItem
) {
  const userRef = doc(db, "users", uid);

  await runTransaction(db, async (transaction) => {
    const user = await transaction.get(userRef);

    if (!user.exists()) {
      throw new Error("No encontramos tu perfil de jugador.");
    }

    const data = user.data();
    const inventory = (data.inventory ?? {}) as Record<string, boolean>;
    const coins = Number(data.coins ?? 0);

    if (inventory[item.id]) {
      throw new Error("Este artículo ya pertenece a tu colección.");
    }

    if (coins < item.price) {
      throw new Error("No tienes suficientes monedas para esta compra.");
    }

    transaction.update(userRef, {
      coins: coins - item.price,
      [`inventory.${item.id}`]: true,
    });
  });
}
