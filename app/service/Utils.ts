import { Service } from 'egg';
import * as Core from '@alicloud/pop-core';

/**
 * Utils Service
 */
export default class Utils extends Service {
  public sendSms(PhoneNumbers: string) {
    const { ctx, app } = this;
    const {
      accessKeyId,
      accessKeySecret,
      endpoint,
      apiVersion,
      sendSms,
    } = app.config.aliyun;
    const { RegionId, SignName, TemplateCode } = sendSms;

    const client = new Core({
      accessKeyId,
      accessKeySecret,
      endpoint,
      apiVersion,
    });

    const sendCode = ctx.helper.smsCode();

    const params = {
      RegionId,
      PhoneNumbers,
      SignName,
      TemplateCode,
      TemplateParam: JSON.stringify({ code: sendCode }),
    };

    const requestOption = {
      method: 'POST',
    };

    return new Promise(async (resolve, _reject) => {
      await client
        .request('SendSms', params, requestOption)
        .then(async (result: any) => {
          await ctx.service.redis.set(PhoneNumbers, sendCode, 60);
          return resolve(result);
        })
        .catch((ex: any) => {
          resolve(ex.data);
        });
    });
  }
}
