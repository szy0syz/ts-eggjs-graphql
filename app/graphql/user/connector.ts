import { Context } from 'egg';
// import * as Dataloader from 'dataloader';

export default class UserConnector {
  loader: any;
  ctx: Context;
  constructor(ctx: Context) {
    this.ctx = ctx;
    // this.loader = new Dataloader(this.fetch.bind(this));
  }

  async register(data: any) {
    const { ctx } = this;
    return await ctx.service.user.register(data);
  }
}
