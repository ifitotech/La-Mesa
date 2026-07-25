"use client";

import { ReactNode } from "react";

type HomeCardProps = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  button: string;
};

export default function HomeCard({
  title,
  subtitle,
  icon,
  button,
}: HomeCardProps) {
  return (
    <div className="mesa-panel group rounded-3xl p-5 transition hover:-translate-y-1 hover:border-violet-400/60">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-500/15 text-violet-300">
        {icon}
      </div>

      <h2 className="text-xl font-black">
        {title}
      </h2>

      <p className="mt-2 text-slate-400">
        {subtitle}
      </p>

      <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 py-3 font-bold transition hover:from-violet-500 hover:to-purple-600">
        {button}
      </button>
    </div>
  );
}
