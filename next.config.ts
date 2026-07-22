import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photography is the whole point of this site, so it is also the whole
    // payload. AVIF lands roughly 30–50% smaller than JPEG at the same
    // perceived quality; WebP is the fallback for older Safari.
    formats: ["image/avif", "image/webp"],
    // Hero and card art never render wider than ~1600px in practice.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
};

export default nextConfig;
