
import { Get, Post } from "../utils/http";
const UsersService = {
  getTableList(params) {
    const url = '/users/list';
    return Post(url, params);
  },
  saveUserInfo(params) {
    const url = '/users/save';
    return Post(url, params);
  },
  addUser(params) {
    const url = '/users/add';
    return Post(url, params);
  },
  deleteUser(params) {
    const url = '/users/delete';
    return Post(url, params);
  },
}
export default UsersService;