import UserService, { CreateUserPayload } from "../../../services/users.service";

const queries = {};

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