# 📦 产品内容管理指南

本文档说明如何替换产品图片、添加新 SKU、替换 3D 模型。

---

## 1. 产品图片

### 存放位置
```
public/images/products/
```

### 命名规范
```
{产品ID前缀}-{序号}.jpg
```
示例：`board-rect-01-a.jpg`, `board-rect-01-b.jpg`

### 推荐规格
| 项目 | 建议值 |
|------|--------|
| 格式 | JPG / WebP |
| 主图尺寸 | 1200×1200 px（正方形） |
| 文件大小 | < 500KB（Next.js 会自动优化） |
| 背景 | 纯白或浅灰，产品居中 |

### 操作步骤
1. 将图片文件放入 `public/images/products/`
2. 在 `src/data/products.json` 中更新对应产品的 `images` 数组
3. 路径格式：`"/images/products/你的文件名.jpg"`

---

## 2. 产品数据（SKU 扩展）

### 数据文件
```
src/data/products.json
```

### 字段说明
```jsonc
{
    "id": "唯一标识（用于 URL，英文+连字符）",
    "name": "产品名称（英文，显示在卡片和详情页标题）",
    "description": "产品简介（可选，显示在详情页）",
    "category": "品类标识（如 cutting-board / serving-tray / utensil）",
    "images": ["图片路径1", "图片路径2"],
    "model3d": "3D 模型路径（可选，如 /models/xxx.glb）",
    "drawing2d": "2D 图纸路径（可选，如 /drawings/xxx.svg）",
    "specs": {
        "dimensions": "尺寸",
        "weight": "重量",
        "material": "材质",
        "color": ["颜色1", "颜色2"],
        "moq": "最低起订量",
        "leadTime": "交货周期",
        "packaging": "包装方式"
    },
    "features": ["特性1", "特性2"],
    "createdAt": "创建日期 YYYY-MM-DD"
}
```

### 新增品类
如要新增品类：
1. 在 `products.json` 中设置新的 `category` 值
2. 产品列表页的筛选按钮会自动识别新品类
3. 可选：在 `src/messages/en.json` 和 `zh.json` 的 `footer` 中添加翻译键

---

## 3. 3D 模型（.glb）

### 存放位置
```
public/models/
```

### 获取 .glb 文件的方式
- **Blender**：建模后 File → Export → glTF 2.0 (.glb)
- **Sketchfab**：下载免费模型时选择 glTF 格式
- **CAD 转换**：Rhino/NX 导出 STEP → 导入 Blender → 导出 .glb
- **在线转换**：https://products.aspose.app/3d/conversion

### 推荐规格
| 项目 | 建议值 |
|------|--------|
| 格式 | .glb（二进制 glTF） |
| 面数 | < 100K 面（性能考虑） |
| 文件大小 | < 5MB |
| 材质 | PBR（Principled BSDF） |
| 居中 | 模型原点在几何中心 |

### 操作步骤
1. 将 `.glb` 放入 `public/models/`
2. 在 `products.json` 中设置 `"model3d": "/models/你的文件.glb"`
3. 无 `.glb` 时，系统自动显示程序化几何体（fallback）

---

## 4. 2D 工程图纸（SVG）

### 存放位置
```
public/drawings/
```

### 推荐规格
- 格式：SVG
- 包含三视图（正视、侧视、俯视）
- 标注关键尺寸

---

## 5. 快速核对表

添加新产品的完整流程：

- [ ] 准备产品图片 → `public/images/products/`
- [ ] 准备 3D 模型（可选） → `public/models/`
- [ ] 准备 2D 图纸（可选） → `public/drawings/`
- [ ] 在 `products.json` 添加新产品条目
- [ ] 运行 `npm run build` 确认构建成功
- [ ] `git add . && git commit && git push` 推送到 GitHub
- [ ] Vercel 自动部署
