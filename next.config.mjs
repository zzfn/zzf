export default {
    swcMinify: true,
    assetPrefix: process.env.NODE_ENV === 'production' ? 'https://oss-zzf.zzfzzf.com/zzf' : '/',
    reactStrictMode: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        domains: ['oss-zzf.zzfzzf.com','www.dmoe.cc'],
    },
    sassOptions: {
        prependData: `@import "styles/variable";`,
    },
};
