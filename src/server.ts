import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";
import resolvers from "./resolvers";

import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";
import { AppDataSource } from "./data-source";

const Server = async () => {
  await AppDataSource.initialize();
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
  let port = process.env.NODE_ENV === 'test' ? 0 : 4000;
  server.listen(port, () => {
    if (port===4000) {
      console.info("Server is running on http://localhost:"+port+"/graphql");
    }
  });
  return server;
};

export default Server;