import type { MetadataRoute } from "next";
import { site } from "../lib/site";
import { publicIndexing, publicPaths } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // No synthetic lastModified: no verified per-page editorial date is available.
  return publicIndexing ? publicPaths.map(path => ({ url: new URL(path, site.url).href })) : [];
}
