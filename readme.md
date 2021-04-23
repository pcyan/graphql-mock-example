# graphql mock 示例

- 支持扩展类型
- 支持多个schema

## 使用示例

### 运行

```shell
node -v             
# v14.16.1
npm install
npm run test
```

> SDL 文件修改后，需要重新运行 `npm run test`

### mock 多个schema

```javascript
// 修改文件路径
const schema = loadSchemaSync('./schema/**/*.graphql', { // load from multiple files using glob
    loaders: [
        new GraphQLFileLoader()
    ]
});
```

> 其他schema读取方式参考 [Loading GraphQL Schemas from different sources](https://www.graphql-tools.com/docs/schema-loading/)

### mock指定返回值

```javascript
// 针对指定数据类型，mock返回特定的返回值，支持scalar
const mocks = {
    Int: () => casual.integer(from = 0, to = 10000),
    Float: () => casual.double(from = 0, to = 10000),
    String: () => casual.title,
    Long: () => casual.integer(from = 0, to = 10000),
    Date: () => casual.date(format = 'YYYY-MM-DDTHH:mm:ss.SSSZZ') // Output Example: 2011-11-11T11:43:31.000-0430
};
```

> 其他mock返回值参考 [graphql-tools/Mocking](https://www.graphql-tools.com/docs/mocking/)

## 参考资料

- [Loading GraphQL Schemas from different sources](https://www.graphql-tools.com/docs/schema-loading/)
- [graphql-tools/Mocking](https://www.graphql-tools.com/docs/mocking/)
- [boo1ean/casual 随机数据生成](https://github.com/boo1ean/casual)
