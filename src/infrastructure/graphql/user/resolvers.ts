const queries = {};

const mutations = {
  createUser: async (_: any, payload: any) => {
    return "User created";
  },
};

export const resolvers = {
  Query: queries,
  Mutation: mutations,
};
