import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">🎲 La Mesa</h1>

      <nav className="space-y-3">
        <Link href="/dashboard" className="block hover:text-yellow-400">
          Dashboard
        </Link>

        <Link href="/tables/create" className="block hover:text-yellow-400">
          Crear Mesa
        </Link>

        <Link href="/tables/join" className="block hover:text-yellow-400">
          Unirse
        </Link>

        <Link href="/games" className="block hover:text-yellow-400">
          Juegos
        </Link>

        <Link href="/profile" className="block hover:text-yellow-400">
          Perfil
        </Link>
      </nav>
    </aside>
  );
}