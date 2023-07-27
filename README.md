# uni-app Vue3 Vite4 pinia2 TypeScript 基础框架

## 简介

-   **uni-app Vue3 Vite4 pinia2 TypeScript 基础框架**
-   cli 创建的 Vue3/Vite 项目 与 使用 HBuilderX 导入插件 的包有差异,请直接访问 [开源地址](https://gitee.com/zhou-yankai/uniapp-vite-vue3-pinia-ts)

### 说明

-   框架完全基于 Vue3 `<script setup>` 写法,不支持 Vue2;
-   可用于学习与交流;
-   目前测试 H5、微信小程序,APP(Android)通过;
-   其他平台暂未测试,后续会增加;
-   如发现问题或建议可在评论区留言, 看到会及时处理;
-   如有需求亦可在评论区留言,或在此项目基础上增加;
-   代码规范 husky、prettier、eslint、lint-staged、stylelint 的作用和使用

## 特性

-   **最新技术栈**：使用 Vue3/Vite4/pinia ,TypeScript 等前端前沿技术开发;
-   **uniapp-nutui**(https://www.uniapp-nutui.tech/guide/quick-start.html):
    uniapp-nutui 组件库，基于Taro版NutUi 4.x版本修改而来，适配了uni-app, 使用 Vue 技术栈开发小程序应用，开箱即用，拥有丰富的业务组件。
-   **Tailwind CSS**(https://www.tailwindcss.cn/docs/installation):
    Tailwind CSS 是一个功能类优先的 CSS 框架，它集成了诸如 flex, pt-4, text-center 和 rotate-90 这样的的类，它们能直接在脚本标记语言中组合起来，构建出任何设计。
-   **Eslint/Prettier/stylelint**: 规范代码样式格式,统一编码;
-   **husky**: 提交代码钩子
-   **路由拦截**:
    [uni-mini-router](https://gitee.com/fant-mini/uni-mini-router),类似Vue Router的API和功能,在uni-app中进行路由跳转、传参、拦截等常用操作;
-   **请求拦截**: 等待接入;

## 目录结构

```shell

├─ src
│ ├─static # 静态公共文件
│ │ ├─ images # 图片
│ │ │ ├─.png
│ │ │ └─...
│ │ │
│ │ └─ ...
│ │
│ ├─components # 组件目录
│ │
│ ├─pages # 页面
│ │ ├─ index
│ │ │ └─index.vue
│ │ └─...
│ │
│ ├─style # 样式
│ │
│ ├─state # 状态管理模式(pinia)
│ │ ├─ modules # 数据模块
│ │ │ ├─auth.ts
│ │ │ └─...
│ │ │
│ │ └─ index.ts
│ │
│ └─utils # 工具类
│ ├─ cache # 缓存相关目录
│ └─ ...
│
├─ .env
├─ .env.development
├─ .env.production
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .prettierignore
├─ .prettierrc.js
├─ .commitlint.config.js
├─ .stylelint.config
├─ index.html
├─ package.json
├─ README.md
├─ tailwind.config.js
├─ tsconfig.json
└─ vite.config.ts

```

## 安装使用

-   安装依赖

```bash
npm install
```

-   运行

```bash
# 其他端请查看 package.json script
npm dev:h5
```

-   打包

```bash
# 其他端请查看 package.json script
npm build:h5
```

-   代码提交命令

```bash
npm run cz
```

### 提交类型

| 提交类型   | 标题               | 描述                                                                                  |
| ---------- | ------------------ | ------------------------------------------------------------------------------------- |
| `feat`     | 特征               | 新功能、新特性                                                                        |
| `fix`      | Bug 修复           | bug 修复                                                                              |
| `docs`     | 文档               | 仅文档更改                                                                            |
| `style`    | 风格               | 不影响代码含义的更改（空格、格式、缺少分号等）                                        |
| `refactor` | 代码重构           | 重构，在不影响代码内部行为，功能下的代码修改                                          |
| `perf`     | 性能改进           | 更改代码，以提高性能                                                                  |
| `test`     | 测试               | 添加缺失的测试或纠正现有的测试                                                        |
| `build`    | 构建               | 影响构建系统或外部依赖项的更改（示例范围：gulp、broccoli、npm）                       |
| `ci`       | 持续集成           | 对我们的 CI 配置文件和脚本的更改（示例范围：Travis、Circle、BrowserStack、SauceLabs） |
| `chore`    | 其他文件修改       | 不修改 src 或测试文件的其他更改                                                       |
| `revert`   | 还原               | 恢复之前的提交                                                                        |
| `release`  | 发布新版本         | \-                                                                                    |
| `workflow` | 工作流相关文件修改 | \-                                                                                    |

![Image text](https://gitee.com/zhou-yankai/uniapp-vite-vue3-pinia-ts/raw/master/src/static/image/ab464291d2f39f4e38178ac21ca4f58.png)
