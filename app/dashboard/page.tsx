import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import DashboardCard from "@/app/components/DashboardCard";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="p-8">
          <h1 className="mb-8 text-4xl font-bold">
            Dashboard
          </h1>

          <div className="grid gap-6 md:grid-cols-3">
            <DashboardCard
              title="Crear Mesa"
              description="Inicia una nueva partida."
            />

            <DashboardCard
              title="Unirse"
              description="Entra en una mesa existente."
            />

            <DashboardCard
              title="Perfil"
              description="Configura tu cuenta."
            />
          </div>
        </main>
      </div>
    </div>
  );
}