import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-url";

const publicRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/dashboard", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/games", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/game-night", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/online", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/solo", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/ranking", priority: 0.6, changeFrequency: "daily" as const },
  { path: "/store", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/tournaments", priority: 0.5, changeFrequency: "weekly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
