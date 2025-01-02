import { ApolloServer } from "@apollo/server";
import { User } from "./users";

async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
        ${User.typeDefs}

        type Query {
          hello: String
          sayHello(name: String): String
          ${User.queries}
        }

        type Mutation {
          ${User.mutations}
        }
        `,
    resolvers: {
      Query: {
        hello: () => "Hello GraphQL",
        sayHello: (_, { name }) => `Hello ${name}`,
        ...User.resolvers.Query,
      },

      Mutation: {
        ...User.resolvers.Mutation,
      },
    },
  });

  // Start the gql server
  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
