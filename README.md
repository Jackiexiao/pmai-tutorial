# 课程目标
https://pmai.jackiexiao.com/

## 下载代码模板

https://github.com/jackiexiao/next-shadcn-template
或者国内网址：
https://gitee.com/jackiegeek/next-shadcn-template

## 注册 Sealos
这里只是为了方便接入各大公司 chatgpt 模型，方便接入对象存储、数据库等服务

你也可以选择使用其他公司的服务，比如
Api : 使用 deepseek.com 官方的 apikey
数据库和对象存储：使用腾讯云 / Vercel 的

注册地址：https://cloud.sealos.run/?uid=N0lFN0Q8_U

获取 Apikey

```
# OPENAI_API_BASE_URL=https://api.deepseek.com/v1

OPENAI_API_BASE_URL=https://aiproxy.hzh.sealos.run/v1
OPENAI_API_KEY=sk-xx
OPENAI_MODEL_NAME=deepseek-chat
```

写入到 .env 文件中，确保它在 .gitignore 里头（保证密钥不泄露）

同时写一个 .env.example ，告诉其他访问这个代码的人，.env 应该怎么写

```
OPENAI_API_BASE_URL=https://aiproxy.hzh.sealos.run/v1
OPENAI_API_KEY=sk-xxx
OPENAI_MODEL_NAME=deepseek-chat
```


## Nodejs 安装，请访问 nodejs.com

## Prompt 提示词


这是一个使用了 Next.js 15 (App Router)、Shadcn UI、Radix UI 和 Tailwind CSS 的代码仓库，请你阅读这个仓库的代码。

我想实现的需求：实现一个 AI 商业画布生成器，具体流程如下

1. 用户可以首页的输入框中输入他们的 idea
2. 调用后端 api，后端 api 应该使用环境变量调用 chatgpt api 获取 json 结果

环境变量信息如下

OPENAI_API_BASE_URL=https://aiproxy.hzh.sealos.run/v1
OPENAI_API_KEY=sk-xxx
OPENAI_MODEL_NAME=deepseek-chat

使用的 prompt 如下

```
基于用户输入的产品"${idea}"生成商业模式画布的九大要点，内容精炼，词汇精准直接。请按以下格式生成JSON响应：

{
  "客户细分": [
    { "point": "point1" },
    { "point": "point2" }
  ],
  "价值主张": [
    { "point": "point1" },
    { "point": "point2" }
  ],
  ...
  // 包含其他模块：渠道通路、客户关系、收入来源、核心资源、关键业务、重要合作、成本结构
}
```
3. 前端拿到后端返回的包含商业画布信息的 json ，应该写一个页面来呈现这个商业画布

我希望总体风格足够现代简洁风。

Vercel 部署
1. 首先注册一个 vercel.com 的账号
2. 终端中运行 npm run build ，如果有报错，让 AI 修复
3. 终端中运行 npm run deploy， 这一步会将你的代码部署到服务器上
4. 到 vercel 设置你的 apikey （环境变量）

大功告成！

https://pmai-example.vercel.app

## FAQ
### 为什么使用 sealos 这类中转 API？
1. 因为未来你大概率需要使用不同的模型
  1. 不同的模型适用场景不同，比如有些响应速度快，有些写代码强，有些写作强
2. 使用中转 API，你就不需要一个一个大模型去自己接入了，省心省事，但缺点就是你可能需要稍微多付一点钱给中转 API。如果你业务规模大了，再切换也不迟。

### 这个 xxx.vercel.app 国内无法访问？
需要绑定自定义域名之后才可以访问，可以在 B 站上搜索 “Vercel 绑定自定义域名”
