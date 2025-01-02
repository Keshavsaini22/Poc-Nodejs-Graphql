import UserService, { CreateUserPayload, GetUserTokenPayload } from "../../../services/users.service";

const queries = {
  getUserToken: async (_: any, payload: GetUserTokenPayload) => {
    const res = await UserService.getUserToken(payload);
    return res;
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
