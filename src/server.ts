import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";
import * as fs from 'fs';
import { AppDataSource } from "./data-source";
import { Resolvers } from './types/resolver-types'

const Server = async () => {
  // Initialize the Database
  await AppDataSource.initialize();
  // Find all the folders that contain our resolvers
  const folders = fs.readdirSync(join(__dirname, "./modules"));
  // Variable to populate the resolvers into
  const resolvers: Resolvers[] = []
  folders.forEach(folder => {
    // all our resolvers follow the same naming pattern for auto loading
    const { resolver } = require(`./modules/${folder}/resolver`);
    // push the loaded resolver into the resolvers array
    resolvers.push(resolver);
  })
  // Load the GraphQL Schema
  const schema = loadSchemaSync(join(__dirname, "./schema.graphql"), {
    loaders: [new GraphQLFileLoader()],
  });

  // Initialize the Yoga server
  const yoga = createYoga({
    schema: createSchema({
      typeDefs: schema,
      resolvers,
    }),
  });

  const server = createServer(yoga);
  
  // Our test server will run on different port to our actual server
  let port = process.env.NODE_ENV === 'test' ? 0 : 4000;
  server.listen(port, () => {
    if (port===4000) {
      console.info("Server is running on http://localhost:"+port+"/graphql");
    }
  });
  return server;
};

export default Server;