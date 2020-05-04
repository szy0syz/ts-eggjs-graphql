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

  /**
   * 获取GitHub 登录地址
   */
  public githubURL() {
    const { login_url, client_id, scope } = this.ctx.app.config.github;
    return `${login_url}?client_id=${client_id}&scope=${scope}&state=${Date.now()}`;
  }
}
