import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.supabase.in" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      // The public journey routes moved from /programs/* to /journeys/*.
      { source: "/programs", destination: "/journeys", permanent: true },
      { source: "/programs/tour/:slug", destination: "/journeys/experiential/:slug", permanent: true },
      { source: "/programs/:category/:slug", destination: "/journeys/:category/:slug", permanent: true },
      { source: "/programs/:category", destination: "/journeys/:category", permanent: true },
      { source: "/about", destination: "/our-story", permanent: true },
      { source: "/attractions/:slug", destination: "/experiences/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
