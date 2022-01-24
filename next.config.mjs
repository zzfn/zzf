const isCdn = process.env.BUILD_TARGET === 'cdn'

export default {
  assetPrefix: isCdn ? ' https://oss-zzf.zzfzzf.com/zzf' : '',
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['oss-zzf.zzfzzf.com'],
  },
  sassOptions: {
    prependData: `@import "styles/variable";`,
  },
};
