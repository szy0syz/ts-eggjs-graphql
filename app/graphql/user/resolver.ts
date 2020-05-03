export default {
  Mutation: {
    async register(_root: any, { data }, { connector }) {
      return await connector.user.register(data);
    },
  },
};
