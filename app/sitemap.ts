import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://luckyxdev.me";
  const routes = [
    "",
    "/projects",
    "/projects/arise",
    "/projects/gym-management",
    "/products",
    "/products/arise",
    "/products/gym-management",
    "/play",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-11-03"),
    changeFrequency: route === "" ? ("monthly" as const) : ("weekly" as const),
    priority:
      route === ""
        ? 1.0
        : route.startsWith("/projects/") || route.startsWith("/products/")
        ? 0.8
        : 0.9,
  }));
}
