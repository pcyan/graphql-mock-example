const express = require('express')
const { graphqlHTTP } = require('express-graphql');

const { addMocksToSchema } = require('@graphql-tools/mock');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');

const casual = require('casual');

const app = express()

const schema = loadSchemaSync('./schema/**/*.graphql', { // load from multiple files using glob
    loaders: [
        new GraphQLFileLoader()
    ]
});

const mocks = {
    Int: () => casual.integer(from = 0, to = 10000),
    Float: () => casual.double(from = 0, to = 10000),
    String: () => casual.title,
    Long: () => casual.integer(from = 0, to = 10000),
    Date: () => casual.date(format = 'YYYY-MM-DDTHH:mm:ss.SSSZZ') // Output Example: 2011-11-11T11:43:31.000-0430
};

const preserveResolvers = false;

const schemaWithMocks = addMocksToSchema({ schema, mocks, preserveResolvers });

app.use('/graphql', graphqlHTTP({
  schema: schemaWithMocks,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');