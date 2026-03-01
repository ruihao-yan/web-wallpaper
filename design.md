# Sakura壁纸 (haowallpaper.com) 设计方案参考

---

## 一、技术栈

| 类别       | 技术                          | 说明                                                       |
| ---------- | ----------------------------- | ---------------------------------------------------------- |
| 前端框架   | Nuxt.js (Vue 3)               | SSR 服务端渲染框架，资源路径含 `_nuxt`，DOM 中有 Vue Router 特征类名 |
| 渲染模式   | SSR (服务端渲染)              | 首屏快速加载 + SEO 友好，搜索引擎可抓取内容                 |
| CSS 方案   | 自定义 CSS                    | 未使用 Bootstrap / Tailwind，采用高度定制化的纯手写 CSS      |
| 数据分析   | GA4 + 百度统计 + Microsoft Clarity | 国内外多套分析系统并行                                     |
| 图片分发   | 本地资源                      | 高分辨率图片通过本地 src 目录提供                            |

---

## 二、设计风格

### 1. 暗色主题 (Dark Theme)

- 整体采用深色背景（深灰 / 近黑色），突出图片内容
- 支持明暗主题切换（导航栏右上角切换按钮）
- 文字使用白色 / 浅灰色，保证对比度

```css
body {
  background-color: #1a1a1a;
  color: #ffffff;
}
```

### 2. 毛玻璃效果 (Glassmorphism)

- 导航栏使用半透明 + 高斯模糊背景
- Hero 区域有模糊背景层叠加在壁纸预览图上
- 增加视觉层次感

```css
.navbar {
  background: rgba(30, 30, 30, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

### 3. 圆角卡片网格

- 壁纸以 4 列等宽网格展示
- 卡片具有统一圆角 (12px)
- Hover 时微缩放 + 阴影变化

```css
.wallpaper-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.wallpaper-card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.wallpaper-card:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

### 4. 交互动效

- 卡片 Hover 缩放 + 阴影
- SPA 无刷新页面跳转（Nuxt Router）
- Hero 轮播区淡入淡出过渡

---

## 三、页面结构

```
┌─────────────────────────────────────────────┐
│  Header: Logo(哲风壁纸)          登入按钮    │
├─────────────────────────────────────────────┤
│  Hero 轮播区: 全屏高清壁纸预览 + 模糊背景     │
├─────────────────────────────────────────────┤
│  导航标签栏（吸顶）                           │
│  壁纸社区 | 电脑壁纸 | 手机壁纸 | 头像制作 | 软件 | 🌙 🔔 │
├─────────────────────────────────────────────┤
│  搜索栏 + 图搜按钮                           │
│  筛选器: 昨日热门 | 种类 | 分类 | 分辨率 | 色系  │
├─────────────────────────────────────────────┤
│  壁纸网格 (4 列)                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ 壁纸1 │ │ 壁纸2 │ │ 壁纸3 │ │ 壁纸4 │       │
│  └──────┘ └──────┘ └──────┘ └──────┘       │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ 壁纸5 │ │ 壁纸6 │ │ 壁纸7 │ │ 壁纸8 │       │
│  └──────┘ └──────┘ └──────┘ └──────┘       │
│  ...更多壁纸（滚动加载）                       │
├─────────────────────────────────────────────┤
│  Footer: 备案信息 | 用户协议 | 隐私政策        │
└─────────────────────────────────────────────┘
```

---

## 四、功能模块

### 导航系统

| 模块       | 路由               | 说明                  |
| ---------- | ------------------ | --------------------- |
| 壁纸社区   | `/wallpaperForum`  | 用户交流论坛          |
| 电脑壁纸   | `/homeView`        | PC 桌面壁纸（主内容区）|
| 手机壁纸   | `/mobileView`      | 竖屏手机壁纸          |
| 头像制作   | `/headImgView`     | 在线头像生成工具      |
| 壁纸软件   | `/softwareDetails` | 客户端下载页          |

### 搜索与筛选

- **关键词搜索**: 输入关键词（插画、动漫、风景等）
- **图搜壁纸**: 上传图片，以图搜图
- **多维筛选**:
  - 种类 — 静态壁纸 / 动态壁纸
  - 分类 — 风景、动漫、游戏、简约等标签
  - 分辨率 — 4K / 5K / 8K
  - 色系 — 按色调筛选

### 用户系统

- 登录注册
- 壁纸收藏 / 下载
- 社区发帖互动
- 会员订阅（终身会员无限下载）

---

## 五、关键实现要点

### Nuxt.js 3 的作用

1. **SSR 服务端渲染** → SEO 友好，搜索引擎可抓取壁纸内容
2. **文件系统路由** → 基于目录结构自动生成页面路由
3. **组件化开发** → 壁纸卡片、筛选器等为独立 Vue 组件
4. **异步数据获取** → `useAsyncData` / `useFetch` 获取壁纸列表
5. **中间件支持** → 处理登录验证、页面权限等逻辑

### 图片优化策略

- 缩略图 + 原图分离，列表页加载小图，详情页加载高清原图
- 懒加载 (`loading="lazy"`) 减少首屏请求
- WebP / AVIF 格式压缩，降低流量消耗
- 本地 src 目录存放图片资源

### 数据分析集成

```javascript
// Google Analytics 4
gtag('config', 'G-XXXXXXXXX');

// 百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?xxxxxxxxx";
  document.getElementsByTagName("head")[0].appendChild(hm);
})();

// Microsoft Clarity (用户行为热力图)
(function(c, l, a, r, i, t, y) { ... })(window, document, "clarity", "script", "xxxxx");
```

---

## 六、复刻技术路线

| 步骤 | 内容            | 工具 / 技术                              |
| ---- | --------------- | ---------------------------------------- |
| 1    | 初始化项目      | `npx nuxi@latest init my-wallpaper-app`  |
| 2    | 暗色主题 + 毛玻璃 | 自定义 CSS，`backdrop-filter`，CSS 变量    |
| 3    | 壁纸网格布局    | CSS Grid + Vue 组件 + 图片懒加载          |
| 4    | 搜索与筛选      | Vue 组件状态管理 + API 接口对接           |
| 5    | 图片存储        | 本地 src 目录存放壁纸资源                  |
| 6    | 用户系统        | JWT 认证 + MySQL / PostgreSQL             |
| 7    | SEO 优化        | Nuxt SSR + Meta 标签 + Sitemap            |
| 8    | 数据分析        | GA4 + 百度统计 + Clarity                  |
| 9    | 部署上线        | Nginx + Node.js 服务器 或 Vercel          |
