## 介绍
Compressed Upload是一款基于TinyPNG的图片自动压缩上传COS的插件，打通开发者手动压缩图片，下载图片，上传COS，复制链接的繁琐流程，致力于提高研发的效率。

## 功能
与TinyPNG相同，仅支持WebP、PNG和JPEG类型图片自动压缩上传，其他图片类型将直接上传。

## 快速上手
- 文件 > 首选项 > 设置 > 扩展 > 上传图片中设置存储图片的COS桶和域，以及云账号 SecretId，SecretKey 。
![](https://compressed-upload-1301608163.cos.ap-guangzhou.myqcloud.com/10-27-1635301481530.png "demo")

- 光标点击需要图片地址的位置，或选中需要替换的代码，点击右键选择上传图片选项，选择要上传的图片，等待几秒即可获取图片自动压缩后上传到COS的HTTP地址。
![](https://compressed-upload-1301608163.cos.ap-guangzhou.myqcloud.com/10-27-1635311823489.gif "demo")