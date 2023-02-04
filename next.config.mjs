export default {
  output: 'standalone',
  assetPrefix:
    process.env.NODE_ENV === 'production' && !process.env.VERCEL
      ? 'https://cdn.zzfzzf.com/zzf'
      : '/',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    domains: ['cdn.zzfzzf.com', 'www.dmoe.cc'],
  },
  sassOptions: {
    prependData: `@import "styles/variable";`,
  },
};
