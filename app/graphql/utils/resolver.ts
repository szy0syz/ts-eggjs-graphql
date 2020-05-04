export default {
  Query: {
    async githubURL(_root: any, _, { connector }) {
      return await connector.utils.githubURL();
    },
  },
  Mutation: {
    async sendSms(_root: any, { PhoneNumbers }, { connector }) {
      return await connector.utils.sendSms(PhoneNumbers);
    },
  },
};
