const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const { addMocksToSchema } = require("@graphql-tools/mock");
const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");

const casual = require("casual");

const app = express();

// 读取指定路径下SDL文件
const schema = loadSchemaSync("./schema/**/*.graphql", {
  // load from multiple files using glob
  loaders: [new GraphQLFileLoader()],
});

// 针对指定数据类型，mock返回特定的返回值
const mocks = {
  Int: () => casual.integer((from = 0), (to = 10000)),
  Float: () => casual.double((from = 0), (to = 10000)),
  String: () => casual.title,
  Long: () => casual.integer((from = 0), (to = 10000)),
  Date: () => casual.date((format = "YYYY-MM-DDTHH:mm:ss.SSSZZ")), // Output Example: 2011-11-11T11:43:31.000-0430
};

const preserveResolvers = false;

const schemaWithMocks = addMocksToSchema({ schema, mocks, preserveResolvers });

app.use(
  "/",
  graphqlHTTP({
    schema: schemaWithMocks,
    graphiql: true,
  })
);

const port = 4000;
app.listen(port);
var url = "http://localhost:" + port;
console.log("🚀 Running a GraphQL API server at " + url);
// open url
var start = process.platform == "darwin" ? "open" : process.platform == "win32" ? "start" : "xdg-open";
require("child_process").exec(start + " " + url);