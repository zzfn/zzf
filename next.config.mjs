export default {
  swcMinify: false,
  assetPrefix:
    process.env.NODE_ENV === 'production' && !process.env.VERCEL
      ? 'https://cdn.orluma.ltd/zzf'
      : '/',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    domains: ['cdn.orluma.ltd', 'www.dmoe.cc'],
  },
  sassOptions: {
    prependData: `@import "styles/variable";`,
  },
};
