export default {
  Mutation: {
    async sendSms(_root: any, { PhoneNumbers }, { connector }) {
      return await connector.utils.sendSms(PhoneNumbers);
    },
  },
};
