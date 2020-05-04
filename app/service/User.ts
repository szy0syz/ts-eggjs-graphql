import { Service } from 'egg';

export default class User extends Service {
  private database: any;
  constructor(ctx: any) {
    super(ctx);
    this.database = ctx.model.Users;
  }

  /**
   * 用户注册
   * @param {object} data 注册信息
   * @memberof User
   */
  async register(data: IRegisterData) {
    const { ctx } = this;
    const { code, name, phone, password } = data;
    const r_code = await ctx.service.redis.get(phone);
    if (Number(code) === Number(r_code)) {
      return await this.database.create({ name, phone, password });
    }
    throw new Error('验证码失效');
  }

  /**
   * GitHub 注册
   * @param {object} data 用户信息
   * @memberof User
   */
  public async githubRegister(data: any) {
    const {
      login: name,
      node_id: oauth_id,
      avatar_url: avatar,
      oauth_type,
    } = data;
    const user = await this.database.create({ name, avatar });

    if (user) {
      const { id } = user;
      const oauth = {
        user_id: id,
        oauth_id,
        oauth_type,
      };
      return await this.ctx.service.oauth.create(oauth);
    }
  }
}

interface IRegisterData {
  code: string;
  name: string;
  phone: string;
  password: string;
}
