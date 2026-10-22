import type { MetadataRoute } from "next";
import { site } from "../lib/site";
import { publicIndexing } from "../lib/seo";

export default function robots(): MetadataRoute.Robots {
  return publicIndexing
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
