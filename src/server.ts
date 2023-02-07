import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";
import * as fs from 'fs';
import { AppDataSource } from "./data-source";
import { Resolvers } from './types/resolver-types'

const Server = async () => {
  await AppDataSource.initialize();
  const folders = fs.readdirSync(join(__dirname, "./modules"));
  const resolvers: Resolvers[] = []
  folders.forEach(folder => {
    const { resolver } = require(`./modules/${folder}/resolver`);
    resolvers.push(resolver);
  })
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