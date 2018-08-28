import axios from 'axios';

const http = method => async (url, params = {}) => {
  return new Promise((resove, reject) => {
    console.log(url, params);
    axios({
      method,
      url,
      params,
    }).then(res => {
      console.log(res.data);
      if (res.data.code === 200) {
        resove(res.data);
      } else {
        reject(res.data.msg);
      }
    }).catch(err => {
      console.log(err);
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