# 动作库 · 1324 个健身动作（手机版）

一个可以直接在手机上查、在手机上看的健身动作库网页，也可以「添加到主屏幕」当 App 用。

- **网址**：https://fuyannn.github.io/exercises-dataset/
- **数据来源**：[hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset)

## 它能做什么

- 搜中文：输入「深蹲」「卧推」「拉伸」这类词，会同时匹配动作名、器械、目标肌群和中文分步要领
- 筛选：按部位（胸 / 背 / 腿 / 肩 / 手臂 / 腰腹 / 有氧）、器械（徒手 / 哑铃 / 杠铃 / 绳索…）、目标肌群过滤
- 看演示：每个动作都有 180×180 的循环动画和缩略图，点开就看
- 收藏：点右上角星标，之后用顶部 ★ 只筛收藏的动作
- 随便来一个：右上角骰子按钮，从当前筛选结果里随机挑一个
- 教学语言：中文 / English / Español / Italiano / Türkçe / Русский / हिन्दी / Polski / 한국어 / Français，10 种随时切
- 离线可用：首次打开后，浏览过的动作会缓存在本地，没网也能翻

## 目录结构

```
.
├── index.html              # 手机版页面（本项目自己写的）
├── data/
│   ├── exercises.json      # 上游原始数据（10 语言全量，MIT）
│   ├── exercises.schema.json
│   ├── index.json          # 首页用的精简索引（本项目生成）
│   └── text.<lang>.json    # 按语言拆分分步要领（本项目生成，按需加载）
├── images/                 # 1324 张 180×180 缩略图
├── videos/                 # 1324 个 180×180 循环动画
├── icons/                  # App 图标
├── sw.js / manifest.webmanifest
├── LICENSE / NOTICE.md     # 上游授权文件，未改动
└── README.md
```

## 授权

- 代码、数据结构、教学文字：**MIT**，见 [LICENSE](LICENSE)。
- 动作图片与动画：© [Gym visual](https://gymvisual.com/)，以上游许可的 180×180 分辨率转载，
  使用时须保留「© Gym visual — https://gymvisual.com/」署名，详见 [NOTICE.md](NOTICE.md)。

本仓库是上述数据集的个人浏览副本，不代表对媒体素材拥有任何额外授权。
