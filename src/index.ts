import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import dotenv from "dotenv";
dotenv.config();

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  //Create Apollo GraphQL Server
  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query {
      hello: String
      sayHello(name: String): String
    }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello GraphQL",
        sayHello: (_, { name }) => `Hello ${name}`,
      },
    },
  });

  //Start Apollo GraphQL Server
  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json("Hello GraphQL");
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
}

init();
