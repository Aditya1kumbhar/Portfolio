import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  trailingSlash: false,
}

export default nextConfig
