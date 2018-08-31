import axios from 'axios';

const http = method => async (url, params = {}) => {
  return new Promise((resove, reject) => {
    axios({
      method,
      url,
      params,
    }).then(res => {
      if (res.data.code === 200) {
        resove(res.data);
      } else {
        reject(res.data.msg);
      }
    }).catch(err => {
      reject(err);
    });
  })
}

const Get = http('get');
const Post = http('post');

export {
  Get,
  Post
}