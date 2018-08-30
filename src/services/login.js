
import { Get, Post } from "../utils/http";

export default {
  login(params) {
    const url = '/login';
    return Post(url, params);
  }
}