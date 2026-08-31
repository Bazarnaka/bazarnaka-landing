import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Le répertoire du projet, sinon Turbopack remonte jusqu'à ~/package-lock.json.
  turbopack: { root: path.resolve(import.meta.dirname) },
};

export default nextConfig;
