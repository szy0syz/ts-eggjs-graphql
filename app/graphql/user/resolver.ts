export default {
  Query: {
    async login(_root: any, { data }, { connector }) {
      const { phone, password } = data;
      return await connector.user.fetchByNamePassword(phone, password);
    },
  },

  Mutation: {
    async register(_root: any, { data }, { connector }) {
      return await connector.user.register(data);
    },
  },
};
