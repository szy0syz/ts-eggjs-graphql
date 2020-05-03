// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportSequelizeMeta = require('../../../app/model/SequelizeMeta');
import ExportUsers = require('../../../app/model/users');

declare module 'egg' {
  interface IModel {
    SequelizeMeta: ReturnType<typeof ExportSequelizeMeta>;
    Users: ReturnType<typeof ExportUsers>;
  }
}
