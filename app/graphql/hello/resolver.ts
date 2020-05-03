export default {
  Query: {
    hellos(_root: any, _, { connector }) {
      return connector.hello.hellos();
    },
  },
};
