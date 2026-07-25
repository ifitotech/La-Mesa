"use client";

import { Bell, ChevronDown, LogOut, Search, Sparkles } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/services/auth";
import { useCountry } from "@/contexts/CountryContext";
import { subscribeActiveUsers } from "@/services/presence";
import { countryProfiles } from "@/lib/country-profile";

const titles: Record<string, string> = {
  "/dashboard": "Tu Game Night",
  "/games": "Juegos disponibles",
  "/lobby": "Salas disponibles",
  "/game-night": "Juegos de Game Night",
  "/online": "Juegos Online",
  "/profile": "Perfil de jugador",
  "/scoreboard": "Marcador de Game Night",
  "/store": "Tienda",
};

export default function Topbar() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const title = titles[pathname] ?? "La Mesa";
  const { country, changeCountry } = useCountry();
  const [activeUsers, setActiveUsers] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    return subscribeActiveUsers(setActiveUsers);
  }, [user]);

  async function handleLogout() {
    try {
      await logoutUser();
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="sticky top-0 z-40 flex min-h-20 items-center justify-between gap-4 border-b border-slate-700/60 bg-[#08121dcc]/70 px-5 py-4 backdrop-blur-xl md:px-8">
      <div>
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-violet-300"><Sparkles size={14} /> La Mesa</p>
        <h1 className="mt-1 text-xl font-black md:text-2xl">{title}</h1>
      </div>

      <div className="hidden max-w-md flex-1 md:block">
        <label className="flex items-center gap-3 rounded-xl border border-slate-700/80 bg-slate-950/55 px-4 py-3 text-slate-400 focus-within:border-violet-400">
          <Search size={17} />
          <input type="search" placeholder="Buscar mesas, jugadores..." className="w-full border-0 bg-transparent p-0 text-sm outline-none" />
        </label>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden lg:block"><button onClick={() => setCountryOpen((value) => !value)} aria-expanded={countryOpen} className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-950/50 px-3 py-2 text-sm font-bold text-slate-200 transition hover:border-violet-300 hover:bg-violet-500/10">{country.flag} {country.name}<ChevronDown size={15} className={`transition ${countryOpen ? "rotate-180" : ""}`} /></button>{countryOpen && <div className="absolute right-0 top-12 z-50 grid w-72 grid-cols-2 gap-1 rounded-2xl border border-slate-700 bg-slate-950 p-2 shadow-2xl">{countryProfiles.map((option) => <button key={option.code} onClick={() => { void changeCountry(option.code); setCountryOpen(false); }} className={`rounded-xl px-3 py-2 text-left text-sm font-bold transition ${country.code === option.code ? "bg-violet-500/25 text-violet-100" : "text-slate-300 hover:bg-slate-800"}`}>{option.flag} {option.name}</button>)}</div>}</div>
        {user && <span className="hidden items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-300 xl:flex"><span className="h-2 w-2 rounded-full bg-emerald-400" />{activeUsers} activos</span>}
        <div className="relative"><button onClick={() => setNotificationsOpen((value) => !value)} aria-label="Notificaciones" aria-expanded={notificationsOpen} className="mesa-action !p-3 text-slate-300"><Bell size={19} /></button>{notificationsOpen && <div className="absolute right-0 top-14 w-64 rounded-2xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-300 shadow-2xl"><p className="font-black text-white">Notificaciones</p><p className="mt-2 text-slate-400">Todavía no tienes notificaciones nuevas.</p></div>}</div>
        <div className="hidden rounded-xl border border-slate-700/80 bg-slate-950/50 px-3 py-2 sm:block">
          <p className="max-w-28 truncate text-sm font-bold">{user?.email?.split("@")[0] ?? "Jugador"}</p>
          <p className="text-xs text-emerald-400">En línea</p>
        </div>
        <button onClick={handleLogout} aria-label="Cerrar sesión" className="mesa-action !border-rose-400/30 !bg-rose-500/15 !p-3 text-rose-200 hover:!bg-rose-500/25"><LogOut size={18} /></button>
      </div>
    </header>
  );
}
