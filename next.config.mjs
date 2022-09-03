export default {
  swcMinify: true,
  assetPrefix: 'https://oss-zzf.zzfzzf.com/zzf',
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['oss-zzf.zzfzzf.com'],
  },
  sassOptions: {
    prependData: `@import "styles/variable";`,
  },
};
