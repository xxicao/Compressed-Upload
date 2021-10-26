# Compressed Upload

<p align="center">
  <img src="images/icon.png" width="128" height="128" alt="Compressed Upload Logo">
</p>

<p align="center">
  <strong>基于 TinyPNG 的图片自动压缩上传 COS 的 VS Code 扩展</strong>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=xxicao.compressed-upload">
    <img src="https://img.shields.io/visual-studio-marketplace/v/xxicao.compressed-upload?label=VS%20Code%20Marketplace&color=blue" alt="VS Code Marketplace">
  </a>
  <img src="https://img.shields.io/badge/VS_Code-%5E1.61.0-blue?logo=visualstudiocode" alt="VS Code Engine">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
</p>

---

## 简介

Compressed Upload 是一款 VS Code 扩展，基于 [TinyPNG](https://tinypng.com/) 实现图片自动压缩后上传至腾讯云对象存储（COS）。

**解决痛点：** 手动压缩图片 → 下载 → 上传 COS → 复制链接，整个流程一键完成。

## 工作流程

```
选择图片 → TinyPNG 压缩 → 上传至 COS → URL 插入编辑器
   │                              │
   └─ PNG/JPG/JPEG：自动压缩 ─────┘
   └─ 其他格式：直接上传 ──────────┘
```

## 功能特性

- 🗜️ **自动压缩** — PNG、JPEG 图片经 TinyPNG 无损压缩后上传，其他格式直接上传
- 🚀 **一键上传** — 右键选择图片，自动压缩并上传至 COS，链接直接插入编辑器
- ✏️ **智能插入** — 光标处直接插入 URL；选中文本则自动替换
- 📛 **自动命名** — 按日期 + 时间戳自动生成文件名，无需手动命名

## 安装

### 方式一：VS Code 扩展市场

在 VS Code 中搜索 **Compressed Upload**，点击安装即可。

### 方式二：VSIX 安装

从 [Releases](https://github.com/xxicao/Compressed-Upload/releases) 下载 `.vsix` 文件，执行：

```bash
code --install-extension compressed-upload-1.2.0.vsix
```

## 配置

打开 VS Code 设置：`文件 > 首选项 > 设置 > 扩展 > 上传图片`

| 配置项 | 说明 | 示例 |
|--------|------|------|
| `upload_image.SecretId` | 腾讯云 API SecretId | *在控制台获取* |
| `upload_image.SecretKey` | 腾讯云 API SecretKey | *在控制台获取* |
| `upload_image.Bucket` | COS 存储桶名称 | `my-bucket-1250000000` |
| `upload_image.Region` | COS 存储桶地域 | `ap-guangzhou` |

> 💡 **获取方式：** SecretId 和 SecretKey 在 [腾讯云访问管理](https://console.cloud.tencent.com/cam/capi) 获取；Bucket 和 Region 在 [COS 控制台](https://console.cloud.tencent.com/cos) 查看。

## 使用方式

1. 将光标定位到需要插入图片地址的位置（或选中需要替换的文本）
2. 右键 → **上传图片**
3. 选择本地图片文件
4. 等待几秒，图片压缩上传后，URL 自动插入编辑器

![配置演示](https://compressed-upload-1301608163.cos.ap-guangzhou.myqcloud.com/10-27-1635301481530.png)

![使用演示](https://compressed-upload-1301608163.cos.ap-guangzhou.myqcloud.com/10-27-1635311823489.gif)

## 支持格式

| 格式 | 压缩 | 说明 |
|------|:----:|------|
| PNG | ✅ | TinyPNG 无损压缩 |
| JPEG / JPG | ✅ | TinyPNG 无损压缩 |
| WebP | ❌ | 直接上传 |
| GIF 等 | ❌ | 直接上传 |

## 项目结构

```
Compressed-Upload/
├── extension.js          # 扩展主入口
├── images/
│   └── icon.png          # 扩展图标
├── test/                 # 测试目录
├── package.json          # 扩展配置与依赖
├── CHANGELOG.md          # 更新日志
└── LICENSE               # MIT 许可证
```

## 技术栈

- [VS Code Extension API](https://code.visualstudio.com/api) — 扩展开发框架
- [TinyPNG API](https://tinypng.com/developers) — 图片压缩服务
- [cos-nodejs-sdk-v5](https://github.com/tencentyun/cos-nodejs-sdk-v5) — 腾讯云 COS SDK

## 常见问题

<details>
<summary>上传失败，提示权限错误？</summary>

请检查以下几点：
1. SecretId 和 SecretKey 是否正确
2. COS 存储桶是否开启了对应的读写权限
3. 存储桶名称和地域是否匹配（注意 Bucket 需包含 AppId，如 `my-bucket-1250000000`）
</details>

<details>
<summary>图片没有压缩就直接上传了？</summary>

目前仅 PNG 和 JPEG/JPG 格式会经过 TinyPNG 压缩，WebP、GIF 等格式将直接上传原文件。
</details>

<details>
<summary>如何获取 TinyPNG API Key？</summary>

本扩展内置了 TinyPNG Key，无需自行申请。如需使用自己的 Key，可修改 `extension.js` 中的 `tinify.key` 配置。
</details>

## 相关链接

- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=xxicao.compressed-upload)
- [问题反馈](https://github.com/xxicao/Compressed-Upload/issues)

## License

[MIT](./LICENSE)
