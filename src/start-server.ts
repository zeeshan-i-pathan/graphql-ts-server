import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";
import resolvers from "./resolvers";

import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";

const startServer = async () => {
  const schema = loadSchemaSync(join(__dirname, "./schema.graphql"), {
    loaders: [new GraphQLFileLoader()],
  });

  const yoga = createYoga({
    schema: createSchema({
      typeDefs: schema,
      resolvers,
    }),
  });

  const server = createServer(yoga);

  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
};

export default startServer;