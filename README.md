## Compressed Upload
基于TinyPNG图片压缩工具的压缩上传COS插件，支持PNG和JPG图片压缩，其他类型图片将直接上传。

## Usage
- 先在文件 》首选项 》设置 》扩展 》上传图片中设置存储图片的COS桶和域，以及相应的云账号SecretId，SecretKey
![](https://compressed-upload-1301608163.cos.ap-guangzhou.myqcloud.com/10-27-1635301481530.png "demo")

- 光标点击需要图片地址的位置，或者选中需要替换的代码，右键点击菜单上传图片选项，选择要上传的图片，等待几秒即可获取图片压缩后上传到COS的HTTP地址
![](https://compressed-upload-1301608163.cos.ap-guangzhou.myqcloud.com/10-26-1635257476289.gif "demo")