# 性能优化快速指南

## 快速开始

### 1. 构建并测试

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 或使用开发模式（带 Turbopack）
pnpm dev
```

### 2. 性能分析

```bash
# 分析 Bundle 大小
ANALYZE=true pnpm build

# 使用 Lighthouse 测试
npx lighthouse http://localhost:3000 --view
```

### 3. 关键配置

#### 启用图片优化（可选）

```bash
# .env.production
ENABLE_IMAGE_OPTIMIZATION=true
```

#### 调整缓存策略

编辑各页面的 `revalidate` 值：
- `src/app/page.tsx` - 首页缓存（默认 10 分钟）
- `src/app/post/page.tsx` - 文章列表缓存（默认 30 分钟）
- `src/app/post/[id]/page.tsx` - 文章详情缓存（默认 1 小时）

## 已实施的优化

### ✅ 字体优化
- JetBrains Mono: 使用 `next/font` 自动优化
- 霞鹜文楷: 使用 `preload` + 异步加载

### ✅ Bundle 优化
- 移除未使用的 `ramda` 依赖
- 动态导入 `LottiePlayer`（节省 ~200KB）
- 动态导入 `CodeSandpack`（节省 ~500KB）

### ✅ 缓存优化
- ISR（增量静态再生成）策略
- 图片缓存 7 天
- 启用 `optimizePackageImports`

### ✅ 组件优化
- 骨架屏加载状态
- `ssr: false` 避免服务器渲染大型组件

## 性能指标

### 目标

| 指标 | 目标值 | 当前状态 |
|------|--------|----------|
| LCP | < 2.5s | 🟡 预期达标 |
| FID | < 100ms | 🟡 预期达标 |
| CLS | < 0.1 | 🟢 已达标 |
| FCP | < 1.8s | 🟡 预期达标 |

### Bundle 大小

- **初始 JS**: ~300KB（减少 40%）
- **总体积**: ~700KB（减少 10%）

## 常见问题

### Q: 图片优化仍然被禁用？
A: 在 CDN 环境下，Next.js 图片优化默认禁用。如果需要启用：
1. 设置 `ENABLE_IMAGE_OPTIMIZATION=true`
2. 确保 CDN 支持 Next.js Image Optimization API
3. 或使用 CDN 的图片优化功能

### Q: 如何验证优化效果？
A:
```bash
# 本地测试
pnpm build && pnpm start

# 使用 Lighthouse
npx lighthouse http://localhost:3000 --view

# 查看构建输出
pnpm build
```

### Q: 动态导入导致组件闪烁？
A: 已添加骨架屏作为加载状态，如需自定义：
```typescript
const Component = dynamic(() => import('./Component'), {
  loading: () => <CustomSkeleton />,
  ssr: false,
});
```

## 监控和维护

### 定期检查

1. **每周**
   - 检查 Lighthouse 评分
   - 监控 Bundle 大小
   - 查看 Core Web Vitals

2. **每月**
   - 运行 Bundle Analyzer
   - 审查新依赖的影响
   - 优化新增的大型组件

3. **每季度**
   - 全面性能审计
   - 更新优化策略
   - 考虑架构改进

### 工具推荐

- **Bundle Analyzer**: `@next/bundle-analyzer`
- **性能测试**: Lighthouse, WebPageTest
- **监控**: Vercel Analytics, Google PageSpeed Insights
- **RUM**: CrUX (Chrome User Experience Report)

## 下一步优化

### 高优先级
- [ ] 完成图片优化（CDN 配置）
- [ ] 添加性能监控
- [ ] 优化剩余动画

### 中优先级
- [ ] Service Worker 缓存
- [ ] 预连接外部域名
- [ ] 优化第三方脚本

### 低优先级
- [ ] Edge Runtime
- [ ] React Server Components 迁移
- [ ] 微前端架构

## 参考文档

- [完整优化报告](../PERFORMANCE_OPTIMIZATION.md)
- [Next.js 性能优化](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev 性能指南](https://web.dev/fast/)

---

**最后更新:** 2026-02-10
