# 📋 项目进度 - 外贸独立站

> 最后更新：2026-02-24 21:58

---

## 基建阶段 ✅

- [x] PRD 产品需求文档
- [x] 02_Architecture 系统架构
- [x] 03_Data_Models 数据模型
- [x] 04_Tech_Stack 技术栈选型

---

## Phase 1：项目框架 + 首页

- [x] **T1.1** 初始化 Next.js 项目（TypeScript + Tailwind + App Router）✅ 构建通过 + 开发服务器正常
- [x] **T1.2** 全局布局（Header + Footer + 响应式导航）✅ 桌面/移动端验证通过
- [x] **T1.3** 首页 Hero Banner + 产品亮点区 ✅
- [x] **T1.4** 首页精选产品卡片 + CTA 区域 ✅

## Phase 2：产品展示

- [x] **T2.1** 产品数据 JSON + TypeScript 类型定义 ✅（已在 T1.1 完成）
- [x] **T2.2** 产品列表页（卡片网格 + 分类筛选）✅
- [x] **T2.3** 产品详情页（图片画廊 + 规格参数）✅
- [x] **T2.4** 3D 模型查看器（react-three-fiber）✅ 程序化几何体 Demo
- [x] **T2.5** 2D 图纸查看器（react-zoom-pan-pinch）✅ SVG 蓝图三视图 Demo

## Phase 3：询盘系统

- [x] **T3.1** 询盘表单组件（react-hook-form + zod 验证）✅
- [x] **T3.2** 询盘 API（/api/inquiry）✅ 控制台日志输出
- [ ] **T3.3** Gmail 邮件通知（nodemailer）— 待凭证
- [ ] **T3.4** Google Sheets 自动归档（googleapis）— 待凭证
- [ ] **T3.5** reCAPTCHA v3 集成 — 待凭证

## Phase 4：多语言

- [x] **T4.1** next-intl 配置 + 中英字典 ✅
- [x] **T4.2** 全页面 i18n 替换 ✅ cookie 方案，不修改 URL

## Phase 5：SEO + 部署

- [x] **T5.1** Meta 标签 + Sitemap + robots.txt + 结构化数据 ✅
- [ ] **T5.2** Vercel 部署 + 域名配置 — 待用户操作
