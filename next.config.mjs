export default {
  swcMinify: false,
  assetPrefix:
    process.env.NODE_ENV === 'production' && !process.env.VERCEL
      ? 'https://oss-zzf.zzfzzf.com/zzf'
      : '/',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    domains: ['oss-zzf.zzfzzf.com', 'www.dmoe.cc'],
  },
  sassOptions: {
    prependData: `@import "styles/variable";`,
  },
};
