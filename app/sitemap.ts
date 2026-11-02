import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://luckyxdev.me";
  const routes = [
    "",
    "/projects",
    "/projects/arise",
    "/projects/royal-gym",
    "/products",
    "/products/arise",
    "/products/royal-gym",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-11-02"),
    changeFrequency: route === "" ? ("monthly" as const) : ("weekly" as const),
    priority:
      route === ""
        ? 1.0
        : route.startsWith("/projects/") || route.startsWith("/products/")
        ? 0.8
        : 0.9,
  }));
}
