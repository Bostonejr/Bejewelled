import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  /** Shows every Sanity fetch with its cache HIT/MISS status during dev. */
  logging: {
    fetches: {fullUrl: true},
  },
}

export default nextConfig
