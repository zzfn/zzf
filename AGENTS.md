# Repository Guidelines

## 项目结构与模块组织
Next.js 应用主入口位于 `src/app`，按路由文件夹划分功能；可复用的 UI 组件统一放在 `src/components`，领域特定的子组件留在各自路由的 `_components` 目录。跨页面的状态与逻辑集中在 `src/atoms`、`src/hooks` 与 `src/services`，工具函数位于 `src/utils`，公共类型定义存放在 `src/types`。静态资源与 SEO 配置分别位于 `public` 与 `next-sitemap.config.js`。

## 构建、测试与开发命令
使用 PNPM：`pnpm dev` 启动本地开发（默认 Turbopack）；`pnpm build` 进行生产构建，构建结束后会自动运行 `next-sitemap`；`pnpm lint` 运行 ESLint；`pnpm lint:fix` 自动修复格式；`pnpm test` 以 watch 模式运行 Jest；`pnpm coverage` 输出覆盖率；`pnpm updateSnapshot` 更新快照；`pnpm start` 以生产模式启动。

## 代码风格与命名规范
项目使用 TypeScript 与 React 19，遵循 ESLint（`next`、`@typescript-eslint`）与 Prettier 组合规则，缩进为 2 空格；Tailwind 工具类按 `prettier-plugin-tailwindcss` 排序。组件命名采用 PascalCase（例如 `ThemeSwitch`），hooks 用 camelCase 且以 `use` 开头，Jotai 原子以业务域前缀命名（如 `articleStateAtom`）。所有样式必须使用 Tailwind，并引用设计令牌或变量（如 `text-primary`、`bg-[color:var(--surface)]`），严禁硬编码颜色值；如需扩展，请在 `tailwind.config.js` 中声明变量。

## 测试指南
单元与组件测试使用 Jest + React Testing Library（配置见 `jest.config.js`）；建议将测试文件放在与被测文件同级目录，命名为 `*.test.ts(x)`。新增功能至少覆盖核心渲染与交互路径，并在提交前运行 `pnpm test` 或 `pnpm coverage` 确认无回归。若依赖外部服务，请使用 mock/stub 保障可重复执行。

## 提交与 Pull Request 规范
遵循 Conventional Commits（项目已配置 Commitlint）：常用类型包括 `feat`、`fix`、`refactor`、`docs`、`chore` 等，简述变更范围，例如 `refactor: consolidate shared components and update imports`。PR 需提供变更摘要、影响范围、测试结果（命令输出或说明），若涉及 UI 变更请附截图或录屏，并在描述中关联相关 Issue 或需求文档。

## 工具链与环境建议
建议使用 Node.js 16 及以上版本（见 `package.json` engines 声明）；提交前运行 `pnpm lint` 与必要测试，以免触发 `simple-git-hooks` 的 `pre-commit` 检查。开发调试时关注 `src/app/post/[id]/_components/ArticleState.tsx` 等位置的 ESLint 警告，优先在功能迭代中逐步清理。

## 沟通与交付要求
所有代码评审、Issue 讨论与提交说明需使用中文撰写，确保信息一致；交付功能时附带简短中文变更摘要，方便团队追踪。
