import { Context } from 'egg';

export default class UtilsConnector {
  ctx: Context;
  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  /**
   * 发送短信
   * @param {string} PhoneNumbers 手机号
   * @memberof UtilsConnector
   */
  public async sendSms(PhoneNumbers: string) {
    const { ctx } = this;
    return await ctx.service.utils.sendSms(PhoneNumbers);
  }
}
