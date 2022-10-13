# Foxpage Plug-ins
[![Minimum node.js version](https://img.shields.io/badge/node-%3E%3D12.14.1-brightgreen)](https://img.shields.io/badge/node-%3E%3D12.14.1-brightgreen)
[![typescript version](https://img.shields.io/badge/typescript-%3E%3D4.0.0-brightgreen)](https://img.shields.io/badge/typescript-%3E%3D4.0.0-brightgreen)
[![yarn](https://img.shields.io/badge/yarn-1.22.5-blue)](https://img.shields.io/badge/yarn-1.22.5-blue)

<h2>A collection of plug-ins, providing the framework with a variety of scene expansion capabilities, free and flexible plug-in use.</h2>

## 🖥  Introduction

Plugins are a common feature of libraries and frameworks, designed with a `microkernel`, which allows developers to add more functionality in a safe, extensible way.

#### Core
The core of the plug-in mainly implements the loading and management functions of the plug-in. The core API is as follows:
- load：Load plugin
- registerPlugin：Register plugins
- unregisterPlugin：Unregister plugins
- getPlugin：get plugins
- getList：get registered plugin list
- hasPlugin：check exist plugin
- mergeVisitors：merge plugin visitors
- getHooks: get all hooks of merged
- destroy：destroy plugins

## ✨ Project

```txt
<Project Root>
  └── packages
  │   ├─foxpage-plugin-common-base            // base plugins
  │   └─foxpage-plugin-content-parse          // content variable parser
  └── jest.config.js                          // jest common config
```

## 📦 Commit

commit used [angular standard](https://github.com/angular/angular/blob/master/CONTRIBUTING.md。

commit config: `commitlint.config.js`。 see: [github](https://github.com/conventional-changelog/commitlint)

commit lint by [husky](https://github.com/typicode/husky)。

npm:

```shell
npm run commit

// or

npx git-cz
```

## 🌍 publish & Release

1. `npm run boot` and succeed before publish.
2. `lerna publish --ignore-scripts --no-push` to publish public packages
3. `npm run release -- --release-as patch` or `npm run release -- --release-as minor` generate new version: [standard-version](https://github.com/conventional-changelog/standard-version#readme).

## ⏳ Contributing

Please read our [Contributing Guide](http://www.foxpage.io/#/guide/contribute) before submitting a Pull Request to the project.

## 🖐 Community support

For general help using Foxpage, please refer to [the official Foxpage documentation](http://www.foxpage.io). For additional help, you can use one of these channels to ask a question:

- [GitHub](https://github.com/foxpage/foxpage) (Bug reports, Contributions)

## 📋 Documentation

See our documentation live [Docs](http://www.foxpage.io) for the Foxpage SDK.

- [Developer docs](http://www.foxpage.io/#/developer)
- [Advance guide](http://www.foxpage.io/#/advance)

## 🏷️ License

See the [LICENSE](./LICENSE) file for licensing information.
