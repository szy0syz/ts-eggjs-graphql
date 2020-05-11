import { Context, Application } from 'egg';

export default function AuthMiddleWare(_options: any, _app: Application) {
  return async (ctx: Context, next: any) => {
    // 为了方便调试，开发者工具 graphiql 如果开启的话则放行
    if (ctx.app.config.graphql.graphiql) {
      await next();
      return;
    }

    // 白名单：有些操作我们是不需要鉴权的
    const whitelist = [ 'login', 'register', 'sendSms', 'githubURL' ];
    const body = ctx.request.body;

    // 如果不在白名单中验证 token
    if (!whitelist.includes(body.operationName)) {
      const uuid = ctx.request.header.authorization;
      // 拿到客户端传的 token 做键去 redis 中取
      const token =
        ctx.helper.JSONParse(await ctx.service.redis.get(uuid)) || {};
      const { name } = token;
      // 取到了放行，反之无效 401
      if (name) {
        await next();
      } else {
        ctx.body = { message: '访问令牌鉴权无效，请重新登陆获取！' };
        ctx.status = 401;
      }
    } else {
      await next();
    }
  };
}
