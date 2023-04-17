# MI-WIFI Redial

通过 `puppeteer` 访问小米路由器的管理界面进行重新拨号操作

## 动机

在为个人项目写一些简单爬虫时，会有机率被对方网站BAN IP，又没有上代理池的需求，重新拨号获取新IP就很方便快捷了。

## 使用

路由地址写在 `.env` 文件中:

```
ROUTER_HOST=http://192.168.1.1
ROUTER_PASSWORD=你的路由器登录密码
```
