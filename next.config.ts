import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  assetPrefix:
    process.env.NODE_ENV === 'production' && !process.env.VERCEL
      ? 'https://cdn.zzfzzf.com/zzf'
      : '/',
  reactStrictMode: true,
  // 图片优化配置
  images: {
    // 环境变量控制图片优化：在 Vercel 或开发环境启用，CDN 环境禁用
    // 如果 CDN 支持 Next.js 图片优化管道，可以设置环境变量 ENABLE_IMAGE_OPTIMIZATION=true
    unoptimized:
      process.env.NODE_ENV === 'production' &&
      !process.env.VERCEL &&
      !process.env.ENABLE_IMAGE_OPTIMIZATION,
    formats: ['image/avif', 'image/webp'],
    // 配置图片域名白名单
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.zzfzzf.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // 设备尺寸列表，优化图片生成
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // 图片尺寸列表
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 最小缓存时间（秒）
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 天
  },
  // 实验性功能和性能优化
  experimental: {
    serverActions: {
      allowedOrigins: ['zzfzzf.com', '*.ooxo.cc'],
    },
    // 启用优化包导入，减少 bundle 大小
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // 优化编译输出
  compiler: {
    // 移除 console.log（生产环境）
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  // 压缩优化
  compress: true,
  // 生产环境 source map
  productionBrowserSourceMaps: false,
};

export default nextConfig;
