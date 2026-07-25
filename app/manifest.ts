import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "La Mesa · Game Night",
    short_name: "La Mesa",
    description:
      "Juegos para compartir, competir y disfrutar con amigos y familia.",
    start_url: "/dashboard",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#050b12",
    theme_color: "#07111f",
    categories: ["games", "entertainment", "social"],
    lang: "es",
    icons: [
      {
        src: "/la-mesa-logo-v2.png",
        sizes: "1254x1254",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/la-mesa-logo-v2.png",
        sizes: "1254x1254",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
