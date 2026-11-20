import { siteConfig } from "@/constants/site";

/**
 * Generates dynamic sitemap for search engines
 * @returns {import('next').MetadataRoute.Sitemap}
 */
export default function sitemap() {
  const routes = ["", "/about"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
