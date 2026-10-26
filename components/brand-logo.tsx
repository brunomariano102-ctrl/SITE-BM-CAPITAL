import { brandAssets } from "../lib/brand";

export function BrandLogo({ className, lazy = false }: { className?: string; lazy?: boolean }) {
  return (
    <img
      className={className}
      src={brandAssets.logo}
      srcSet={`${brandAssets.logo1x} 1x, ${brandAssets.logo} 2x`}
      alt="BM Capital"
      width={310}
      height={150}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
    />
  );
}
