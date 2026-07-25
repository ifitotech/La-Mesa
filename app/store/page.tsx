"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  StoreItem,
  buyItem,
  getStoreItems,
} from "@/services/store";
import { useAuthContext } from "@/contexts/AuthContext";

export default function StorePage() {
  const [items, setItems] = useState<
    StoreItem[]
  >([]);
  const { user } = useAuthContext();
  const [buying, setBuying] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getStoreItems().then(setItems).catch(() => setMessage("Configura Firebase para cargar la tienda."));
  }, []);

  async function handleBuy(item: StoreItem) {
    if (!user) {
      setMessage("Inicia sesión para comprar artículos.");
      return;
    }
    try {
      setBuying(item.id);
      await buyItem(user.uid, item);
      setMessage(`Compraste ${item.name}.`);
    } catch {
      setMessage("No se pudo completar la compra. Revisa tus monedas y Firebase.");
    } finally {
      setBuying(null);
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-xl bg-slate-900 p-4"
        >
          <Image
            src={item.image}
            alt={item.name}
            width={128}
            height={128}
            className="mb-3 h-32 w-full object-contain"
          />

          <h3>{item.name}</h3>

          <p>{item.description}</p>

          <button onClick={() => handleBuy(item)} disabled={buying === item.id} className="mt-4 w-full rounded-lg bg-green-600 p-3 disabled:opacity-50">
            {buying === item.id ? "Comprando..." : `${item.price} monedas`}
          </button>
        </div>
      ))}
      {message && <p className="text-center text-sm text-slate-300">{message}</p>}
    </div>
  );
}
