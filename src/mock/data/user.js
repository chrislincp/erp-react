import Mock from 'mockjs';

const userInfo = {
  id: 1,
  username: 'admin',
  name: 'LinCP',
  avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  github: 'https://github.com/chrislincp',
}

const Users = [];

for (let i = 0; i < 199; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }))
}

export {
  userInfo,
  Users,
}