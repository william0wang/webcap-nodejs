# WebCap

## 安装运行

```bash
# 克隆工程
git clone https://github.com/william0wang/webcap-nodejs.git

# npm安装
cd webcap-nodejs
npm install -g

# 前台运行
webcap

# 配合screen后台运行
screen -dmS webcap webcap
```

## 请求格式

```js

http://localhost:7381/cap/:url/:filepath/:filename/:delay/:useragent

// 使用移动浏览器UA
http://localhost:7381/cap/https%3a%2f%2fwww.10ln.com/%2fUsers%2fwilliam%2fDocuments%2faboem%2ftemp/outfile/5

// 使用桌面浏览器UA
http://localhost:7381/cap/https%3a%2f%2fwww.10ln.com/%2fUsers%2fwilliam%2fDocuments%2faboem%2ftemp/outfile/5/desktop

```

## 参数说明

参数 | 类型 | 说明
---------|----------|---------
 url       | string | 请求的链接地址
 filepath  | string | 存储文件的路径
 filename  | string | 存储文件名
 delay     | int    | 延迟，加载页面延迟时间
 useragent | string | 浏览器UserAgent字符串

 *PS:* `useragent` 默认值: 为空时使用iOS 10移动浏览器UA, 值为`desktop`时使用Safari 10桌面浏览器UA

## 返回值

```json
{
   "ret" : 0,
   "error" : {},
   "file" : "/usr/local/var/www/out.jpg"
}
```

参数 | 类型 | 说明
---------|----------|---------
 ret       | int    | 结果状态，0 正常，-1 异常
 file      | string | 存储文件的完整路径
 error     | object | 错误信息
