import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588491399599_6346';

  // add your egg config in here
  config.middleware = [ 'error', 'graphql' ];
  // config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.security = {
    csrf: {
      ignore: () => true,
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    apolloServerOptions: {
      tracing: true, // 设置为true时，以Apollo跟踪格式收集和公开跟踪数据
      debug: true, // 一个布尔值，如果发生执行错误，它将打印其他调试日志记录
    },
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'ts-eggjs-graphql',
  };

  config.bodyParser = {
    enable: true,
    jsonLimit: '10mb',
  };

  config.aliyun = {
    accessKeyId: 'LTAIwPm6KYRHsSZZ',
    accessKeySecret: 'Cx5ct1FNRb6kxjaIIUQrr6SYbJVkMJ',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25',
    sendSms: {
      RegionId: 'cn-hangzhou',
      SignName: 'sns服务',
      TemplateCode: 'SMS_135033928',
    },
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };

  config.github = {
    login_url: 'https://github.com/login/oauth/authorize',
    // github Client ID
    client_id: '52a36545d74a3dbb7e82',
    // github Client Secret
    client_secret: '0631d5af073d397f3223ea31c8f7ed3f361753f4',
    // 此参数表示只获取用户信息
    scope: [ 'user' ],
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
