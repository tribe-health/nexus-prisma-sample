import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import { createContext } from './context';

class AppServer {
  express: Express;

  constructor () {
    this.express = express()
    this.routes()
    this.apollo()
  }

  routes () {
    this.express.get("/", (_, res) => res.send("Backend"))
  }

  async apollo() {
    const apolloServer = new ApolloServer({
      context: (e) => createContext(e),
      schema,
    })
  
    await apolloServer.start();
    apolloServer.applyMiddleware({app: this.express, path: '/graphql'});
  }
}

export default new AppServer().express
