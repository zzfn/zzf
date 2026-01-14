# next.js 个人博客

[![Build Status](https://drone.zzfzzf.com/api/badges/zzfn/zzf/status.svg)](https://drone.zzfzzf.com/zzfn/zzf)

## ✨ 特性

- 前后端分离
- 支持深色、浅色模式
- Claymorphism + Vibrant Block-based 设计风格

## 🎨 设计风格

本项目采用 **Claymorphism + Vibrant & Block-based** 设计风格，具有以下特点：

### Claymorphism 粘土质感

- **外凸阴影**：多层阴影模拟 3D 粘土效果，包含高光和暗部
- **内凹效果**：交互元素使用内陷阴影，形成对比
- **圆润边角**：大圆角 (`rounded-2xl`/`rounded-3xl`) 卡片设计

```css
/* 外凸样式 */
box-shadow:
  8px 8px 16px color-mix(in srgb, var(--fgColor-default) 8%, transparent),
  -4px -4px 12px color-mix(in srgb, var(--bgColor-default) 80%, white),
  inset 1px 1px 2px color-mix(in srgb, var(--bgColor-default) 50%, white),
  inset -1px -1px 2px color-mix(in srgb, var(--fgColor-default) 5%, transparent);

/* 内凹样式 */
box-shadow:
  inset 4px 4px 8px color-mix(in srgb, var(--fgColor-default) 6%, transparent),
  inset -2px -2px 6px color-mix(in srgb, var(--bgColor-default) 60%, white);
```

### Vibrant 鲜艳配色

- **渐变色调色板**：使用鲜艳的双色渐变
  - 紫色系：`from-violet-500 to-purple-600`
  - 玫红系：`from-rose-500 to-pink-600`
  - 青蓝系：`from-cyan-500 to-blue-600`
  - 翠绿系：`from-emerald-500 to-teal-600`
  - 琥珀系：`from-amber-500 to-orange-600`
- **Emoji 点缀**：增加趣味性和视觉识别度

### Block-based 分块布局

- **卡片化设计**：内容模块化，每个区块独立
- **网格布局**：使用 Grid 系统组织内容
- **Hover 交互**：悬停时卡片轻微放大 (`scale: 1.02`)

### 动画效果

- **Framer Motion**：使用 spring 弹性动画
- **Stagger 入场**：元素依次渐入
- **微交互**：按钮按压、滑动指示器等

## 博客全栈项目仓库地址

- [用户前台](https://github.com/zzfn/zzf)
- [管理后台](https://github.com/zzfn/zeus)
- [JAVA 服务端](https://github.com/zzfn/blog-server)
- [GO 服务端](https://github.com/zzfn/blog-server-go)

## 相关服务地址

- [C 端地址](https://zzfzzf.com)
- [B 端地址](https://admin.zzfzzf.com)//访客账号密码`test/test`
- [JENKINS](https://jenkins.zzfzzf.com)
- [NPM 私有库](https://npm.zzfzzf.com)

## 技术点

### 前端

- next.js
  classnames
- axios
- scss
- dayjs
- typescript
- react.js
- shiki
- eslint
- prettier
- babel
- tailwindcss
- npx sort-package-json

### 后端`(deprecated)`

- SpringBoot
- SpringCloud`(deprecated)`
- MyBatis-Plus
- Swagger-UI
- Elasticsearch
- Logstash
- Redis
- Lombok
- Nginx
- Hutool`(deprecated)`
- nacos`(deprecated)`
- sentinel`(deprecated)`
- RabbitMQ
- 钉钉机器人

### GO

### 代码提交关键词

```
feat:        A new feature
fix:         A bug fix
improvement: An improvement to a current feature
docs:        Documentation only changes
style:       Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
refactor:    A code change that neither fixes a bug nor adds a feature
perf:        A code change that improves performance
```
