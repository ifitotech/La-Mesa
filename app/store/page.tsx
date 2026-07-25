"use client";

import Image from "next/image";
import { Coins, LoaderCircle, PackageOpen, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { useAuthContext } from "@/contexts/AuthContext";
import { buyItem, getStoreItems, StoreItem } from "@/services/store";

export default function StorePage() {
  const [items, setItems] = useState<StoreItem[]>([]);
  const { user } = useAuthContext();
  const [buying, setBuying] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const timeout = new Promise<StoreItem[]>((_, reject) => {
      window.setTimeout(() => reject(new Error("Store request timed out")), 5000);
    });

    Promise.race([getStoreItems(), timeout])
      .then((storeItems) => {
        if (active) setItems(storeItems);
      })
      .catch(() => {
        if (active) setMessage("No pudimos cargar los artículos de la tienda.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
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
      setMessage("No se pudo completar la compra. Revisa tus monedas e inténtalo otra vez.");
    } finally {
      setBuying(null);
    }
  }

  return (
    <AppLayout>
      <section className="mx-auto w-full max-w-6xl space-y-6">
        <header className="mesa-panel overflow-hidden rounded-3xl p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
              <ShoppingBag size={24} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[.24em] text-violet-300">
                Personaliza tu mesa
              </p>
              <h1 className="mt-2 text-3xl font-black sm:text-4xl">Tienda</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Consigue avatares, marcos y distintivos para darle tu estilo a
                cada Game Night.
              </p>
            </div>
          </div>
        </header>

        {message && (
          <p
            role="status"
            className="rounded-2xl border border-violet-300/20 bg-violet-500/10 px-4 py-3 text-sm text-violet-100"
          >
            {message}
          </p>
        )}

        {loading ? (
          <div className="mesa-panel flex min-h-64 flex-col items-center justify-center rounded-3xl p-8 text-center">
            <LoaderCircle className="animate-spin text-violet-300" size={30} />
            <p className="mt-4 font-bold">Cargando artículos...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="mesa-panel flex min-h-64 flex-col items-center justify-center rounded-3xl p-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-300">
              <PackageOpen size={28} />
            </span>
            <h2 className="mt-5 text-xl font-black">Próximamente</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
              Todavía no hay artículos disponibles. Vuelve pronto para descubrir
              nuevas formas de personalizar tu perfil.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={item.id} className="mesa-panel rounded-3xl p-5">
                <div className="rounded-2xl bg-slate-900/80 p-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={160}
                    height={160}
                    className="h-36 w-full object-contain"
                  />
                </div>
                <h2 className="mt-4 text-lg font-black">{item.name}</h2>
                <p className="mt-2 min-h-10 text-sm leading-5 text-slate-400">
                  {item.description}
                </p>
                <button
                  onClick={() => handleBuy(item)}
                  disabled={buying === item.id}
                  className="mesa-action mt-5 flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Coins size={17} />
                  {buying === item.id ? "Comprando..." : `${item.price} monedas`}
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </AppLayout>
  );
}
