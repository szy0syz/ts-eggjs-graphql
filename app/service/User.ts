import { Service } from 'egg';

export default class User extends Service {
  private database: any;
  constructor(ctx: any) {
    super(ctx);
    this.database = ctx.model.Users;
  }


  /**
   * 用户登录
   * @param {string} phone  手机号
   * @param {string} password 密码
   * @memberof User
   */
  public async fetchByNamePassword(phone: string, password: string) {
    const { ctx } = this;
    const uuid = ctx.helper.uuidv1();
    const user = await this.database.findOne({
      where: {
        phone,
        password,
      },
    });

    if (!user) return null;
    const result = JSON.stringify(user);
    await ctx.service.redis.set(uuid, result, 3600 * 24);
    return uuid;
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
