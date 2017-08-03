# WebCap

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
 useragent | string | 用户代理

 useragent 为空时默认使用iOS 10 UA，"desktop"： Safari 10 桌面浏览器，其他可直接传UA字符串

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
