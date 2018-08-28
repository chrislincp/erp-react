import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { userInfo } from './data/user';
const Mock = new MockAdapter(axios, { delayResponse: 1000 });

Mock.onPost('/login').reply(config => {
  const {username, password} = config.params;
  return new Promise((resolve, reject) => {
    if (username === 'admin' && password === 'admin') {
      resolve([200, {code: 200, msg: '请求成功', obj: userInfo}]);
    } else {
      resolve([200, { code: 500, msg: '账号密码错误'}]);
    }
  })
})