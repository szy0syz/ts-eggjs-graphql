# ts-eggjs-graphql

> 讲真用了好久 eggjs，重来没试过与 ts 结合，这样一个穿来穿去的框架用 ts 怕会变味吧。

## Notes

### 安装插件

- 支持 `TypeScript` 的 `graphql` 插件
  - `npm i --save @switchdog/egg-graphql`
- 开启 CORS 跨域访问
- 关闭 CSRF

### GraphQL 代码结构

`graphql` 目录下，有 `4` 种代码，分别是：`common` 全局类型定义、`query` 查询代码、**mutation 更新操作代码**和 `resolver` 业务实现代码。

```bash
.
├── graphql                       | graphql 代码
│   ├── common                    | 通用类型定义
│   │   ├── resolver.js           | 合并所有全局类型定义
│   │   ├── scalars               | 自定义类型定义
│   │   │   └── date.js           | 日期类型实现
│   │   └── schema.graphql        | schema 定义
│   ├── mutation                  | 所有的更新
│   │   └── schema.graphql        | schema 定义
│   ├── query                     | 所有的查询
│   │   └── schema.graphql        | schema 定义
│   └── user                      | 用户业务
│       ├── connector.js          | 连接数据服务
│       ├── resolver.js           | 类型实现
│       └── schema.graphql        | schema 定义
```

### egg-graphql issues

- 没有 Mutation 时千万别写 `{}`，否则报 `GraphQLError: Syntax Error: Expected Name, found "}"` 这个错误，务必删除多余文件！！

### sequelize mysql

- local-mysql: root/password

### 流程

![01](docs/images/1708a75466a5aa41.jpg)

