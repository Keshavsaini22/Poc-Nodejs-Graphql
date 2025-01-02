import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import dotenv from "dotenv";
import createApolloGraphqlServer from "./infrastructure/graphql";
import UserService from "./services/users.service";
dotenv.config();

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  const graphqlServer = await createApolloGraphqlServer();

  app.get("/", (req, res) => {
    res.json("Hello GraphQL");
  });

  app.use("/graphql", expressMiddleware(graphqlServer, {
    context: async ({ req }) => {
      const token = req.headers["token"];

      try {
        const user = UserService.decodeJWTToken(token as string);
        return { user };
      } catch (error) {
        console.log('error in context of graphql: ', error);
        return {};
      }
    },
  })
  );

  app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
}

init();
