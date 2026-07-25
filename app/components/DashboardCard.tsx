import { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
};

export default function DashboardCard({
  title,
  description,
  icon,
}: DashboardCardProps) {
  return (
    <div className="group cursor-pointer rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-slate-800">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white transition-colors group-hover:bg-blue-500">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}