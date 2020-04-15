export function downFlie(fileName,url) {
    let downloadElement = document.createElement('a');
    let arr = url.split('.')
    let name = arr[arr.length - 1];
    downloadElement.style.display = 'none';
    downloadElement.href = url;
    downloadElement.download = fileName+'.'+name; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.target = "_blank";
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
}


