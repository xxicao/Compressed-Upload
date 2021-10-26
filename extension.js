const vscode = require('vscode');
const tinify = require("tinify");
const fs = require("fs");
const COS = require('cos-nodejs-sdk-v5');

// tinyPNG压缩
function tinyCompress(sourceData) {
  return new Promise((resolve,reject) => {
  tinify.key = "K6QltTJjbSdNFTY6y1QWM5rnXT42zPjZ";
  tinify.fromBuffer(sourceData).toBuffer(function(err, data) {
    if(data) {
     resolve(data)
    }
    if (err) {
     reject(err);
    }
   });
  })
 }
// URL插入编辑器
function addUrlToEditor(url) {
  let editor = vscode.window.activeTextEditor
  if (!editor) {
    return
  }
  const { start, end, active } = editor.selection
  if (start.line === end.line && start.character === end.character) {
    // 光标位置插入内容
    const activePosition = active
    editor.edit((editBuilder) => {
    editBuilder.insert(activePosition, url)
    })
  } else {
    // 替换选中内容
    const selection = editor.selection
    editor.edit((editBuilder) => {
    editBuilder.replace(selection, url)
    })
  }
 }
// 生成文件名
function getFileName(){
  const newDate = new Date();
  const timeStamp = newDate.getTime();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  return `${month}-${date}-${timeStamp}`
}
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let texteditor  = vscode.commands.registerTextEditorCommand('extension.choosedImage', async () => {
		const fileUrl = await vscode.window.showOpenDialog({
      canSelectFolders: false,
      canSelectMany: false,
      filters: {
        images: ['png', 'jpg','jpeg','gif','webp'],
      },
    });
    if(!fileUrl) return;
    const fileUrL = fileUrl[0].path.slice(1,)
    const extName = fileUrL.split(/\.(gif|png|jpg|jpeg|webp)$/i)[1]
    fs.readFile(fileUrL, async (err,data) => {
      if (err) throw err;
      // 读取用户设置
      const userConfig =  vscode.workspace.getConfiguration('upload_image')
      const { Bucket, Region, SecretId, SecretKey } = userConfig;
      // tinyPNG压缩，支持PNG JPEG
      let imageBuffer = data;
      if(['png', 'jpg','jpeg'].includes(extName)){
        imageBuffer = await tinyCompress(data);
      }
      // 上传COS
      const cos = new COS({
        SecretId,
        SecretKey,
      });
      cos.putObject({
        Bucket, /* 必须 */
        Region,    /* 必须 */
        Key: `${getFileName()}.${extName}`,/* 必须 */
        Body: imageBuffer, // 上传文件对象
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData));
        }
      }, function(err, data) {
        if(err) throw err;
        addUrlToEditor(`https://${data.Location}`)
      });
    }); 
	});
	context.subscriptions.push(texteditor);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
