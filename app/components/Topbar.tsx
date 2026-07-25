"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  LogIn,
  LogOut,
  Search,
  Sparkles,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { useCountry } from "@/contexts/CountryContext";
import { useAuth } from "@/hooks/useAuth";
import { countryProfiles } from "@/lib/country-profile";
import { logoutUser } from "@/services/auth";
import { subscribeActiveUsers } from "@/services/presence";

const titles: Record<string, string> = {
  "/dashboard": "Inicio",
  "/games": "Juegos",
  "/lobby": "Partidas online",
  "/game-night": "Game Night",
  "/online": "Juegos Online",
  "/profile": "Perfil",
  "/ranking": "Clasificación",
  "/scoreboard": "Marcador",
  "/store": "Tienda",
  "/tournaments": "Torneos",
};

const englishTitles: Record<string, string> = {
  "/dashboard": "Home",
  "/games": "Games",
  "/lobby": "Online matches",
  "/game-night": "Game Night",
  "/online": "Online Games",
  "/profile": "Profile",
  "/ranking": "Ranking",
  "/scoreboard": "Scores",
  "/store": "Store",
  "/tournaments": "Tournaments",
};

const searchDestinations = [
  { words: ["inicio", "home"], href: "/dashboard" },
  { words: ["juego", "games", "trivia", "dominó", "domino", "bingo", "cartas", "cards", "parejas", "memory"], href: "/games" },
  { words: ["online", "mesa", "sala", "lobby"], href: "/online" },
  { words: ["perfil", "profile", "amigo", "friend"], href: "/profile" },
  { words: ["marcador", "score"], href: "/scoreboard" },
  { words: ["tienda", "store", "avatar"], href: "/store" },
  { words: ["ranking", "clasificación"], href: "/ranking" },
  { words: ["torneo", "tournament"], href: "/tournaments" },
];

export default function Topbar() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { country, changeCountry, isEnglish } = useCountry();
  const title = (isEnglish ? englishTitles : titles)[pathname] ?? "La Mesa";
  const [activeUsers, setActiveUsers] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [search, setSearch] = useState("");

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

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = search.trim().toLocaleLowerCase();
    if (!query) return;
    const destination = searchDestinations.find((item) =>
      item.words.some((word) => word.includes(query) || query.includes(word)),
    );
    router.push(destination?.href ?? `/games?search=${encodeURIComponent(query)}`);
    setSearch("");
  }

  return (
    <header className="sticky top-0 z-40 flex min-h-16 items-center justify-between gap-3 border-b border-blue-200/10 bg-[#07111fe8] px-4 py-3 backdrop-blur-xl sm:px-6 xl:min-h-20 xl:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <Link href="/dashboard" className="flex shrink-0 items-center gap-2">
          <Image src="/la-mesa-logo-v2.png" alt="La Mesa" width={42} height={42} priority className="h-10 w-10 rounded-xl border border-blue-200/40 object-cover shadow-lg shadow-blue-950/70" />
          <span className="hidden text-lg font-black tracking-tight text-slate-100 sm:inline">LA MESA</span>
        </Link>
        <div className="min-w-0 border-l border-slate-700/70 pl-3">
          <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[.16em] text-blue-300 xl:hidden"><Sparkles size={11} /> {title}</p>
          <p className="hidden text-xs font-bold uppercase tracking-[.2em] text-violet-300 xl:flex"><Sparkles size={14} /> La Mesa</p>
          <h1 className="hidden text-xl font-black xl:mt-1 xl:block">{title}</h1>
        </div>
      </div>

      <form onSubmit={handleSearch} role="search" className="hidden max-w-md flex-1 xl:block">
        <label className="flex items-center gap-3 rounded-xl border border-slate-700/80 bg-slate-950/55 px-4 py-3 text-slate-400 focus-within:border-blue-400">
          <Search size={17} />
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={isEnglish ? "Find a game or section..." : "Buscar juego o sección..."} aria-label={isEnglish ? "Search La Mesa" : "Buscar en La Mesa"} className="w-full border-0 bg-transparent p-0 text-sm outline-none" />
        </label>
      </form>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button onClick={() => setCountryOpen((value) => !value)} aria-label="Cambiar país" aria-expanded={countryOpen} className="inline-flex items-center gap-1 rounded-xl border border-slate-700/80 bg-slate-950/50 px-2.5 py-2 text-sm font-bold text-slate-200 transition hover:border-blue-300 hover:bg-blue-500/10">
            <span>{country.flag}</span>
            <span className="hidden lg:inline">{country.name}</span>
            <ChevronDown size={14} className={`hidden sm:block transition ${countryOpen ? "rotate-180" : ""}`} />
          </button>
          {countryOpen && (
            <div className="absolute right-0 top-12 z-50 grid w-72 grid-cols-2 gap-1 rounded-2xl border border-slate-700 bg-slate-950 p-2 shadow-2xl">
              {countryProfiles.map((option) => (
                <button key={option.code} onClick={() => { void changeCountry(option.code); setCountryOpen(false); }} className={`rounded-xl px-3 py-2 text-left text-sm font-bold transition ${country.code === option.code ? "bg-blue-500/25 text-blue-100" : "text-slate-300 hover:bg-slate-800"}`}>
                  {option.flag} {option.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {user && <span className="hidden items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-300 2xl:flex"><span className="h-2 w-2 rounded-full bg-emerald-400" />{activeUsers} activos</span>}

        <div className="relative">
          <button onClick={() => setNotificationsOpen((value) => !value)} aria-label="Notificaciones" aria-expanded={notificationsOpen} className="rounded-xl border border-slate-700/80 bg-slate-950/50 p-2.5 text-slate-300 transition hover:border-blue-300 hover:bg-blue-500/10"><Bell size={18} /></button>
          {notificationsOpen && <div className="absolute right-0 top-12 w-64 rounded-2xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-300 shadow-2xl"><p className="font-black text-white">Notificaciones</p><p className="mt-2 text-slate-400">Todavía no tienes notificaciones nuevas.</p></div>}
        </div>

        {user ? (
          <button onClick={handleLogout} aria-label="Cerrar sesión" className="rounded-xl border border-rose-400/30 bg-rose-500/15 p-2.5 text-rose-200 transition hover:bg-rose-500/25"><LogOut size={18} /></button>
        ) : (
          <Link href="/auth/login" aria-label="Iniciar sesión" className="rounded-xl border border-blue-400/30 bg-blue-500/15 p-2.5 text-blue-100 transition hover:bg-blue-500/25"><LogIn size={18} /></Link>
        )}
      </div>
    </header>
  );
}
