// Vercel previews and local development keep their indexing blocks.
export const publicIndexing = process.env.VERCEL_ENV === "production";
export const publicPaths = [
  "/", "/solucoes/consorcios", "/solucoes/credito", "/solucoes/seguros",
  "/solucoes/investimentos", "/solucoes/planejamento", "/privacidade",
] as const;
