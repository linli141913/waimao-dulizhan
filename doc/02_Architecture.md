# 02 系统架构

> 单一事实来源 — 先图后码，所有开发以本文档为准
> 
> 📐 可视化预览：用浏览器打开 `doc/architecture_preview.html` 可放大查看所有图表

---

## 一、高层系统架构

```mermaid
graph TB
    subgraph 客户端["🌐 客户端（浏览器）"]
        PAGE["静态页面<br/>首页 / 产品 / 关于"]
        VIEWER3D["3D 查看器<br/>react-three-fiber"]
        VIEWER2D["2D 图纸查看器<br/>react-zoom-pan-pinch"]
        FORM["询盘表单<br/>react-hook-form + zod"]
    end

    subgraph VERCEL["☁️ Vercel"]
        CDN["全球 CDN<br/>静态资源分发"]
        SSG["Next.js SSG<br/>构建时生成 HTML"]
        API["Serverless API<br/>/api/inquiry"]
    end

    subgraph 外部服务["📡 外部服务"]
        GMAIL["Gmail<br/>nodemailer"]
        SHEETS["Google Sheets<br/>询盘归档"]
        CAPTCHA["reCAPTCHA v3<br/>机器人拦截"]
    end

    subgraph 静态资源["📁 静态资源"]
        GLB["3D 模型 .glb"]
        IMG["产品图片"]
        DWG["2D 图纸 PNG/SVG"]
    end

    PAGE --> CDN
    VIEWER3D --> GLB
    VIEWER2D --> DWG
    CDN --> SSG
    GLB --> CDN
    IMG --> CDN
    DWG --> CDN
    FORM -->|POST| API
    API -->|发送通知| GMAIL
    API -->|写入行| SHEETS
    FORM -->|验证| CAPTCHA
```

---

## 二、页面路由结构

```mermaid
graph LR
    ROOT["/[locale]"] --> HOME["/ 首页"]
    ROOT --> PRODUCTS["/products 产品列表"]
    PRODUCTS --> DETAIL["/products/[id] 产品详情"]
    ROOT --> ABOUT["/about 关于我们"]
    ROOT --> CONTACT["/contact 联系/询盘"]

    DETAIL -->|嵌入| V3D["3D 查看器"]
    DETAIL -->|嵌入| V2D["2D 图纸查看器"]
    DETAIL -->|弹窗| INQUIRY["询盘弹窗"]
    CONTACT -->|包含| INQUIRY
```

> `[locale]` = `en` | `zh`，由 `next-intl` 中间件自动路由

---

## 三、询盘数据流（核心业务流程）

```mermaid
sequenceDiagram
    actor 客户
    participant 浏览器
    participant reCAPTCHA
    participant API as /api/inquiry
    participant Gmail
    participant Sheets as Google Sheets

    客户->>浏览器: 填写询盘表单
    浏览器->>reCAPTCHA: 请求验证 Token
    reCAPTCHA-->>浏览器: 返回 Token
    浏览器->>API: POST 表单数据 + Token
    API->>reCAPTCHA: 验证 Token 合法性
    reCAPTCHA-->>API: 验证通过 ✅
    
    par 并行执行
        API->>Gmail: 发送询盘通知邮件给管理员
        API->>Sheets: 追加一行询盘数据
        API->>Gmail: 发送确认邮件给客户
    end

    API-->>浏览器: 返回成功响应
    浏览器-->>客户: 显示"提交成功"
```

---

## 四、项目目录结构

```
waimao-dulizhan/
├── public/
│   ├── models/           ← 3D 模型 (.glb)
│   ├── drawings/         ← 2D 图纸 (.png/.svg)
│   └── images/           ← 产品照片、公司图片
├── src/
│   ├── app/
│   │   ├── [locale]/     ← 多语言动态路由
│   │   │   ├── page.tsx           ← 首页
│   │   │   ├── products/
│   │   │   │   ├── page.tsx       ← 产品列表
│   │   │   │   └── [id]/page.tsx  ← 产品详情
│   │   │   ├── about/page.tsx     ← 关于我们
│   │   │   └── contact/page.tsx   ← 联系/询盘
│   │   ├── api/
│   │   │   └── inquiry/route.ts   ← 询盘 API
│   │   └── layout.tsx             ← 全局布局
│   ├── components/
│   │   ├── layout/        ← Header / Footer / Nav
│   │   ├── product/       ← ProductCard / ModelViewer / DrawingViewer
│   │   ├── inquiry/       ← InquiryForm / InquiryModal
│   │   └── ui/            ← Button / Input 等通用组件
│   ├── lib/               ← 工具函数（邮件发送、Sheets 写入等）
│   ├── data/              ← 产品数据 JSON
│   └── i18n/              ← 翻译字典 en.json / zh.json
├── doc/                   ← 📐 架构白板文档（你正在看的）
└── content/               ← (预留) MDX 内容
```

---

## 五、组件依赖关系

```mermaid
graph TD
    Layout["RootLayout<br/>Header + Footer + i18n Provider"]
    
    Layout --> HomePage
    Layout --> ProductList
    Layout --> ProductDetail
    Layout --> AboutPage
    Layout --> ContactPage

    ProductDetail --> ModelViewer["ModelViewer<br/>react-three-fiber"]
    ProductDetail --> DrawingViewer["DrawingViewer<br/>react-zoom-pan-pinch"]
    ProductDetail --> InquiryModal["InquiryModal"]
    
    ContactPage --> InquiryForm["InquiryForm<br/>react-hook-form"]
    InquiryModal --> InquiryForm
    
    InquiryForm -->|POST| InquiryAPI["/api/inquiry"]
    InquiryAPI --> EmailService["lib/email.ts"]
    InquiryAPI --> SheetsService["lib/sheets.ts"]

    ProductList --> ProductCard
    HomePage --> ProductCard
    ProductCard -->|链接| ProductDetail
```
