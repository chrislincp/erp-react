import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { userInfo, Users } from './data/user';
import mockjs from 'mockjs';

const Mock = new MockAdapter(axios, { delayResponse: 1000 });

let _Users = Users;

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

Mock.onPost('/users/list').reply(config => {
  const {page, size, name} = config.params;
  let mockUsers = _Users.filter(user => {
    if (name && user.name.indexOf(name) == -1) return false;
    return true;
  });
  let total = mockUsers.length;
  mockUsers = mockUsers.filter((u, index) => index < size * page && index >= size * (page - 1));
  return new Promise((resolve, reject) => {
    resolve([200, {code: 200, msg: '查询成功', obj: { total, rows: mockUsers }}]);
  })
})

Mock.onPost('/users/save').reply(config => {
  let { id, name, addr, age, birth, sex } = config.params;
  _Users.some(u => {
    if (u.id === id) {
      u.name = name;
      u.addr = addr;
      u.age = age;
      u.birth = birth;
      u.sex = sex;
      return true;
    }
  });
  return new Promise((resolve, reject) => {
    resolve([200, {code: 200, msg: '保存成功'}]);
  })
})

Mock.onPost('/users/delete').reply(config => {
  const { id } = config.params;
  _Users = _Users.filter(u => u.id !== id);
  return new Promise((resolve, reject) => {
    resolve([200, {code: 200, msg: '删除成功'}]);
  })
})

Mock.onPost('/users/add').reply(config => {
  let { name, addr, age, birth, sex } = config.params;
  const user = {
    id: mockjs.mock(mockjs.Random.guid()),
    name,
    sex,
    age,
    birth,
    addr,
  };
  _Users.push(user);
  console.log(user);
  return new Promise((resolve, reject) => {
    resolve([200, {code: 200, msg: '新增成功'}]);
  })
})
