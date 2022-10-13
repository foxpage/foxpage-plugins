# Foxpage Plug-ins
[![Minimum node.js version](https://img.shields.io/badge/node-%3E%3D12.14.1-brightgreen)](https://img.shields.io/badge/node-%3E%3D12.14.1-brightgreen)
[![typescript version](https://img.shields.io/badge/typescript-%3E%3D4.0.0-brightgreen)](https://img.shields.io/badge/typescript-%3E%3D4.0.0-brightgreen)
[![yarn](https://img.shields.io/badge/yarn-1.22.5-blue)](https://img.shields.io/badge/yarn-1.22.5-blue)
[![coverage](https://img.shields.io/badge/coverage-63%25-green)](https://img.shields.io/badge/coverage-63%25-green)

<h2>插件集合，为框架提供多种场景扩展能力，自由灵活插拔使用</h2>

## 🖥  介绍

插件是库和框架的常见功能，采用 `微内核` 设计，它允许开发人员以安全，可扩展的方式添加更多功能。

#### 核心
插件核心主要是实现了插件的加载和管理功能，核心 API 如下：

- load：加载插件
- registerPlugin：注册插件
- unregisterPlugin：卸载插件
- getPlugin：获取插件
- getList：获取已注册插件列表
- hasPlugin：判断是否存在插件
- mergeVisitors：合并插件实现
- getHooks: 获取所有已合并的钩子函数
- destroy：销毁插件

## ✨ 项目结构

```txt
<Project Root>
  └── packages
  │   ├─foxpage-plugin-common-base            // base plugins
  │   └─foxpage-plugin-content-parse          // content variable parser
  └── jest.config.js                          // jest common config
```

## 📦 代码提交

代码提交使用标准 [angular standard](https://github.com/angular/angular/blob/master/CONTRIBUTING.md。

代码提交配置: `commitlint.config.js`。 see: [github](https://github.com/conventional-changelog/commitlint)

代码格式化：[husky](https://github.com/typicode/husky)。

npm:

```shell
npm run commit

// or

npx git-cz
```

## 🌍 NPM包发布 & 版本发布

1. 在发布之前执行`npm run boot`.
2. `lerna publish --ignore-scripts --no-push` 发布NPM包
3. `npm run release -- --release-as patch` or `npm run release -- --release-as minor` 生成新版本: [standard-version](https://github.com/conventional-changelog/standard-version#readme).

## ⏳ 贡献

在向项目提交拉取请求之前，请阅读我们的 贡献指南。

## 🖐 社区支持

有关 Foxpage 使用的一般帮助，请参阅 Foxpage 官方文档。 如需其他帮助，您可以使用以下渠道之一提出问题:

- [GitHub](https://github.com/foxpage/foxpage) (错误报告，贡献)

## 📋 文档中心

- [开发者文档](http://www.foxpage.io/#/developer)
- [进阶](http://www.foxpage.io/#/advance)

## 🏷️ 使用许可

点击 [LICENSE](./LICENSE) 查看更多使用许可信息.
