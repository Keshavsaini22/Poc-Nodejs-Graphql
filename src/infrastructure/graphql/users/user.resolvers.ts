import UserService, { CreateUserPayload, GetUserTokenPayload } from "../../../services/users.service";

const queries = {
  getUserToken: async (_: any, payload: GetUserTokenPayload) => {
    const res = await UserService.getUserToken(payload);
    return res;
  },

  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      return user;
    }

    throw new Error("I don't know who are you");
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);
    return "User created successfully with id: " + res.id;
  },
};

export const resolvers = {
  Query: queries,
  Mutation: mutations,
};
